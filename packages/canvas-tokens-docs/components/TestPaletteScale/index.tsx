import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {Subtext} from '@workday/canvas-kit-react/text';
import {token} from '@workday/canvas-tokens-web/token';

import {getTokens, getTokensByStep} from '../../util';
import type {DocsToken} from '../../util/tokens';

import './index.css';

type TestPaletteScaleProps = {
  group: string;
  isDark?: boolean;
};

const Swatch = ({color}: {color: string}) => {
  return <div className="swatch" style={{background: color}} />;
};

/** All tokens of a group, nested ones included, named by the path after the group (`caution.inner`) */
const getAllTokens = (tokens: DocsToken[], prefix: string[]) =>
  Object.fromEntries(
    tokens.map(token => {
      const inGroup = prefix.every((part, i) => token.path[i] === part);
      // Tokens of the group file that live outside the group, like `brand.gradient.primary`
      const name = inGroup ? token.path.slice(prefix.length) : token.path.slice(1);
      return [name.join('.'), token];
    })
  );

export const TestPaletteScale = ({group, isDark}: TestPaletteScaleProps) => {
  const path = group.split('.');
  // `palette.red` is the `red` family of `base.palette`, others are groups like `brand.primary`
  const colors =
    path[0] === 'palette'
      ? getTokensByStep(getTokens('base.palette'), path.slice(1))
      : getAllTokens(getTokens(group), path);

  return (
    <Card data-theme="sana-canvas" data-color-mode={isDark ? 'dark' : undefined}>
      <Card.Heading>{group}</Card.Heading>
      <div className="swatch-container">
        {Object.entries(colors).map(([key, value]: [string, any]) => (
          <div key={key} className="swatch-item">
            {value?.$value && <Swatch color={token(value?.key.replace(/{|}/g, '') as any) as unknown as string} />}
            <Subtext size="small">{key}</Subtext>
          </div>
        ))}
      </div>
    </Card>
  );
};
