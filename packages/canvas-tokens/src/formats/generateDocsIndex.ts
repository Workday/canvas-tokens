import {fileHeader} from 'style-dictionary/utils';
import {camelCase} from 'case-anything';

export const generateDocsIndex = async ({file, options}: any) => {
  const {imports} = options;
  const header = await fileHeader({file});
  const importBlock = imports
    .map((i: string) => `import ${camelCase(i.replace('.js', ''))} from "./${i}";\n`)
    .join('');

  const exportDefault = `
export default {
  palette: basePalette,
  base: {
    motion: baseMotion,
    opacity: baseOpacity,
    shadow: baseShadow,
    size: baseSize,
    type: baseType,
  },
  brand: {
    ...brandAction.brand,
    ...brandCaution.brand,
    ...brandCommon.brand,
    ...brandCritical.brand,
    ...brandNeutral.brand,
    ...brandPositive.brand,
    ...brandPrimary.brand,
  },
  component: {
    ...componentExpressiveIcon,
    ...componentSystemIcon,
  },
  system: {
    color: {
      ...systemColorAccent.color,
      ...systemColorBg.color,
      ...systemColorBorder.color,
      ...systemColorChart.color,
      ...systemColorFg.color,
      ...systemColorFocus.color,
      ...systemColorShadow.color,
      ...systemColorSurface.color,
      brand: {
        ...systemColorAccent.color.brand,
        ...systemColorBorder.color.brand,
        ...systemColorFg.color.brand,
        ...systemColorFocus.color.brand,
        ...systemColorSurface.color.brand,
      },
    },
    ...systemBreakpoint,
    ...systemDepth,
    ...systemGap,
    ...systemMotion,
    ...systemOpacity,
    ...systemPadding,
    ...systemShape,
    ...systemSize,
    ...systemType,
  },
};`;

  return header + importBlock + exportDefault;
};
