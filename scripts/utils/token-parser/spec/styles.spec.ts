import {describe, expect, it} from 'vitest';
import {createContext} from '../context.js';
import {generateStyleTokens} from '../styles.js';
import {generateVariableTokens} from '../variables.js';
import {colorsCollectionId, createCollection, createPayload, createVariable, lightModeId, themeCollectionId} from './fixtures.js';

function createDepthStylePayload() {
  const shadowY = createVariable({
    id: 'shadow-1-100-y',
    key: 'shadow-1-100-y',
    name: 'shadow/1/100/y',
    resolvedType: 'FLOAT',
    scopes: ['EFFECT_FLOAT'],
    valuesByMode: {[lightModeId]: 1},
  });
  const shadowBlur = createVariable({
    id: 'shadow-1-100-blur',
    key: 'shadow-1-100-blur',
    name: 'shadow/1/100/blur',
    resolvedType: 'FLOAT',
    scopes: ['EFFECT_FLOAT'],
    valuesByMode: {[lightModeId]: 4},
  });
  const shadowColor = createVariable({
    id: 'shadow-1-key',
    key: 'shadow-1-key',
    name: 'shadow/1/key',
    variableCollectionId: themeCollectionId,
    valuesByMode: {[lightModeId]: {r: 0, g: 0, b: 0, a: 0.03}},
  });
  const shadowCollectionId = 'col-shadow';

  const basePayload = createPayload([shadowY, shadowBlur], {
    [shadowCollectionId]: createCollection(shadowCollectionId, 'Shadow'),
  });
  const themePayload = createPayload([shadowColor], {
    [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
  });

  const stylesPayload = {
    library: {name: 'tokens'},
    meta: {variableCollections: {}, variables: {}},
    styles: {
      published: [
        {
          node_id: 'depth-1',
          name: 'Depth 1',
          style_type: 'EFFECT',
          description: 'Raised surfaces, cards',
        },
      ],
      nodes: {
        'depth-1': {
          document: {
            effects: [
              {
                type: 'DROP_SHADOW',
                offset: {x: 0, y: 1},
                radius: 4,
                spread: -1,
                color: {r: 0, g: 0, b: 0, a: 0.03},
                boundVariables: {
                  offsetY: {type: 'VARIABLE_ALIAS', id: 'shadow-1-100-y'},
                  radius: {type: 'VARIABLE_ALIAS', id: 'shadow-1-100-blur'},
                  color: {type: 'VARIABLE_ALIAS', id: 'shadow-1-key'},
                },
              },
            ],
          },
        },
      },
    },
  };

  return {basePayload, themePayload, stylesPayload};
}

describe('generateStyleTokens', () => {
  it('uses token references for depth effect bound variables', () => {
    const {basePayload, themePayload, stylesPayload} = createDepthStylePayload();
    const context = createContext(basePayload);
    context.extend(themePayload);

    generateVariableTokens(basePayload, context);
    generateVariableTokens(themePayload, context);

    const files = generateStyleTokens(stylesPayload, context);
    const depth = files.get('system/depth.json');

    expect(depth?.depth?.['1'].$value).toEqual([
      {
        type: 'dropShadow',
        x: {value: 0, unit: 'px'},
        y: '{shadow.1.100.y}',
        blur: '{shadow.1.100.blur}',
        spread: {value: -1, unit: 'px'},
        color: '{shadow.1.key}',
      },
    ]);
  });

  it('places typography styles under type and filters more-styles', () => {
    const themeVariables = [
      createVariable({
        id: 'type-font-family-default',
        name: 'type/font/family/default',
        variableCollectionId: themeCollectionId,
        resolvedType: 'STRING',
        valuesByMode: {[lightModeId]: 'Sana Sans'},
      }),
      createVariable({
        id: 'type-font-weight-regular',
        name: 'type/font/weight/regular',
        variableCollectionId: themeCollectionId,
        resolvedType: 'FLOAT',
        valuesByMode: {[lightModeId]: 400},
      }),
      createVariable({
        id: 'type-font-size-body-md',
        name: 'type/font/size/body/md',
        variableCollectionId: themeCollectionId,
        resolvedType: 'FLOAT',
        valuesByMode: {[lightModeId]: 18},
      }),
      createVariable({
        id: 'type-line-height-body-md',
        name: 'type/line-height/body/md',
        variableCollectionId: themeCollectionId,
        resolvedType: 'FLOAT',
        valuesByMode: {[lightModeId]: 24},
      }),
      createVariable({
        id: 'type-letter-spacing-body-md',
        name: 'type/letter-spacing/body/md',
        variableCollectionId: themeCollectionId,
        resolvedType: 'FLOAT',
        valuesByMode: {[lightModeId]: 0},
      }),
    ];
    const themePayload = createPayload(themeVariables, {
      [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
    });
    const stylesPayload = {
      library: {name: 'tokens'},
      meta: {variableCollections: {}, variables: {}},
      styles: {
        published: [
          {node_id: 'body-md', name: 'Body/Body M - (400) Regular', style_type: 'TEXT'},
          {node_id: 'more-title', name: 'More styles/Title/Title M - (500) Medium', style_type: 'TEXT'},
        ],
        nodes: {
          'body-md': {
            document: {
              boundVariables: {
                fontFamily: [{type: 'VARIABLE_ALIAS', id: 'type-font-family-default'}],
                fontWeight: [{type: 'VARIABLE_ALIAS', id: 'type-font-weight-regular'}],
                fontSize: [{type: 'VARIABLE_ALIAS', id: 'type-font-size-body-md'}],
                lineHeight: [{type: 'VARIABLE_ALIAS', id: 'type-line-height-body-md'}],
                letterSpacing: [{type: 'VARIABLE_ALIAS', id: 'type-letter-spacing-body-md'}],
              },
              style: {
                fontFamily: 'Sana Sans',
                fontWeight: 400,
                fontSize: 18,
                lineHeightPx: 24,
                letterSpacing: 0,
              },
            },
          },
          'more-title': {
            document: {
              style: {
                fontFamily: 'Sana Sans',
                fontWeight: 500,
                fontSize: 48,
                lineHeightPx: 56,
                letterSpacing: -0.54,
              },
            },
          },
        },
      },
    };

    const context = createContext(themePayload);
    generateVariableTokens(themePayload, context);
    const files = generateStyleTokens(stylesPayload, context);
    const type = files.get('system/type.json');

    expect(type?.type?.body?.md?.$type).toBe('typography');
    expect(type?.type?.body?.md?.$value).toEqual({
      fontFamily: '{font-family.$root}',
      fontWeight: '{font-weight.regular}',
      fontSize: '{font-size.body.md}',
      lineHeight: '{line-height.body.md}',
      letterSpacing: '{letter-spacing.body.md}',
    });
    expect(type).not.toHaveProperty('more-styles');
    expect(type?.type).not.toHaveProperty('title');
  });
});
