import {stripIndent} from 'common-tags';
import {expectTransformFactory} from '../../utils/expectTransformFactory';
import transform from '../migrateOldTokens';

const expectTransform = expectTransformFactory(transform);

describe('Canvas Kit Tokens > Canvas Tokens v2', () => {
  it('should not transform tokens from other imports', () => {
    const input = stripIndent`
        import { colors, depth } from "@other-package";
      `;

    const expected = stripIndent`
        import { colors, depth } from "@other-package";
      `;

    expectTransform(input, expected);
  });

  describe('colors', () => {
    it('should add cssVar and base token imports', () => {
      const input = stripIndent`
          import { colors } from "@workday/canvas-kit-react/tokens";
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { base, system } from "@workday/canvas-tokens-web";
        `;

      expectTransform(input, expected);
    });

    it('should convert color tokens to base tokens', () => {
      const input = stripIndent`
          import { colors } from "@workday/canvas-kit-react/tokens";

          const color = colors.blueberry400;
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { base, system } from "@workday/canvas-tokens-web";

          const color = cssVar(base.blueberry400);
        `;

      expectTransform(input, expected);
    });

    it('should handle mixed color token imports', () => {
      const input = stripIndent`
          import { colors } from "@other-package";
          import { colors as canvasColors } from "@workday/canvas-kit-react/tokens";

          const color1 = colors.blueberry400;
          const color2 = canvasColors.blueberry400;
        `;

      const expected = stripIndent`
          import { colors } from "@other-package";
          import { cssVar } from "@workday/canvas-kit-styling";
          import { base, system } from "@workday/canvas-tokens-web";

          const color1 = colors.blueberry400;
          const color2 = cssVar(base.blueberry400);
        `;

      expectTransform(input, expected);
    });

    it('should transform color tokens in createStyles', () => {
      const input = stripIndent`
          import { createStyles } from "@workday/canvas-kit-styling";
          import { colors } from "@workday/canvas-kit-react/tokens";

          const styles = createStyles({
            background: colors.frenchVanilla100,
            color: colors.blueberry400
          });
        `;

      const expected = stripIndent`
          import { createStyles, cssVar } from "@workday/canvas-kit-styling";
          import { base, system } from "@workday/canvas-tokens-web";

          const styles = createStyles({
            background: system.color.bg.default,
            color: system.color.fg.primary.default
          });
      `;

      expectTransform(input, expected);
    });

    it('should transform color tokens in createStencil', () => {
      const input = stripIndent`
          import { createStencil } from "@workday/canvas-kit-styling";
          import { colors } from "@workday/canvas-kit-react/tokens";

          const styles = createStencil({
            base: {
              background: colors.frenchVanilla100,
              color: colors.blueberry400,
              svg: {
                fill: colors.blueberry400
              }
            }
          });
        `;

      const expected = stripIndent`
          import { createStencil, cssVar } from "@workday/canvas-kit-styling";
          import { base, system } from "@workday/canvas-tokens-web";

          const styles = createStencil({
            base: {
              background: system.color.bg.default,
              color: system.color.fg.primary.default,

              svg: {
                fill: system.color.fg.primary.default
              }
            }
          });
        `;

      expectTransform(input, expected);
    });

    it('should transform color tokens in createStencil', () => {
      const input = stripIndent`
          import { createStencil } from "@workday/canvas-kit-styling";
          import { colors } from "@workday/canvas-kit-react/tokens";

          const styles = css({
            background: colors.frenchVanilla100,
            color: colors.blueberry400,
            border: \`1px solid \${colors.blueberry400}\`,
            svg: {
              fill: colors.blueberry400
            }
          });
        `;

      const expected = stripIndent`
          import { createStencil, cssVar } from "@workday/canvas-kit-styling";
          import { base, system } from "@workday/canvas-tokens-web";

          const styles = css({
            background: cssVar(system.color.bg.default),
            color: cssVar(system.color.fg.primary.default),
            border: \`1px solid \${cssVar(system.color.border.primary.default)}\`,
            svg: {
              fill: cssVar(system.color.fg.primary.default)
            }
          });
        `;

      expectTransform(input, expected);
    });
  });

  describe('Border Radius > Shape', () => {
    it('should convert border radius tokens to shape tokens', () => {
      const input = stripIndent`
          import { borderRadius } from "@workday/canvas-kit-react/tokens";

          const radius = borderRadius.m;
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const radius = cssVar(system.shape.x1);
        `;

      expectTransform(input, expected);
    });
  });

  describe('Space', () => {
    it('should convert all space tokens to system tokens', () => {
      const input = stripIndent`
          import { space } from "@workday/canvas-kit-react/tokens";

          const spacingZero = space.zero;
          const spacingXxxs = space.xxxs;
          const spacingXxs = space.xxs;
          const spacingXs = space.xs;
          const spacingS = space.s;
          const spacingM = space.m;
          const spacingL = space.l;
          const spacingXl = space.xl;
          const spacingXxl = space.xxl;
          const spacingXxxl = space.xxxl;
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const spacingZero = cssVar(system.space.zero);
          const spacingXxxs = cssVar(system.space.x1);
          const spacingXxs = cssVar(system.space.x2);
          const spacingXs = cssVar(system.space.x3);
          const spacingS = cssVar(system.space.x4);
          const spacingM = cssVar(system.space.x6);
          const spacingL = cssVar(system.space.x8);
          const spacingXl = cssVar(system.space.x10);
          const spacingXxl = cssVar(system.space.x16);
          const spacingXxxl = cssVar(system.space.x20);
        `;

      expectTransform(input, expected);
    });

    it('should convert space tokens in css object', () => {
      const input = stripIndent`
          import { space } from "@workday/canvas-kit-react/tokens";

          const styles = css({
            margin: space.m,
            padding: \`\${space.m} \${space.l}\`,
          });
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const styles = css({
            margin: cssVar(system.space.x6),
            padding: \`\${cssVar(system.space.x6)} \${cssVar(system.space.x8)}\`,
          });
        `;

      expectTransform(input, expected);
    });

    it('should handle aliased space token imports', () => {
      const input = stripIndent`
          import { space as canvasSpace } from "@workday/canvas-kit-react/tokens";

          const spacingZero = canvasSpace.zero;
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const spacingZero = cssVar(system.space.zero);
        `;

      expectTransform(input, expected);
    });
  });

  describe('Typography', () => {
    it('should convert font family tokens to system tokens', () => {
      const input = stripIndent`
          import { type } from "@workday/canvas-kit-react/tokens";

          const fontFamily = type.properties.fontFamilies.default;
          const fontFamilyMono = type.properties.fontFamilies.monospace;
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const fontFamily = cssVar(system.fontFamily.default);
          const fontFamilyMono = cssVar(system.fontFamily.mono);
        `;

      expectTransform(input, expected);
    });

    it('should convert font size tokens to system tokens', () => {
      const input = stripIndent`
          import { type } from "@workday/canvas-kit-react/tokens";

          const fontSize = type.properties.fontSizes[10];
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const fontSize = cssVar(system.fontSize.subtext.small);
        `;

      expectTransform(input, expected);
    });

    it('should convert font weight tokens to system tokens', () => {
      const input = stripIndent`
          import { type } from "@workday/canvas-kit-react/tokens";

          const fontWeight = type.properties.fontWeights.regular;
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const fontWeight = cssVar(system.fontWeight.regular);
        `;

      expectTransform(input, expected);
    });

    describe('levels', () => {
      it('should convert type levels to system token objects', () => {
        const input = stripIndent`
            import { type } from "@workday/canvas-kit-react/tokens";

            const styles = type.levels.subtext.small;
          `;

        const expected = stripIndent`
            import { cssVar } from "@workday/canvas-kit-styling";
            import { system } from "@workday/canvas-tokens-web";
            
            const styles = {
              fontFamily: cssVar(system.fontFamily.default),
              fontSize: cssVar(system.fontSize.subtext.small),
              lineHeight: cssVar(system.lineHeight.subtext.small),
              fontWeight: cssVar(system.fontWeight.regular),
              color: cssVar(system.color.fg.default)
            };
          `;

        expectTransform(input, expected);
      });

      it('should handle aliased type level imports', () => {
        const input = stripIndent`
            import { type as canvasType } from "@workday/canvas-kit-react/tokens";

            const styles = canvasType.levels.subtext.small;
          `;

        const expected = stripIndent`
            import { cssVar } from "@workday/canvas-kit-styling";
            import { system } from "@workday/canvas-tokens-web";
            
            const styles = {
              fontFamily: cssVar(system.fontFamily.default),
              fontSize: cssVar(system.fontSize.subtext.small),
              lineHeight: cssVar(system.lineHeight.subtext.small),
              fontWeight: cssVar(system.fontWeight.regular),
              color: cssVar(system.color.fg.default)
            };
          `;

        expectTransform(input, expected);
      });

      it('should convert individual type level properties', () => {
        const input = stripIndent`
            import { type } from "@workday/canvas-kit-react/tokens";

            const color = type.levels.subtext.small.color;
            const fontSize = type.levels.subtext.small.fontSize;
          `;

        const expected = stripIndent`
            import { cssVar } from "@workday/canvas-kit-styling";
            import { system } from "@workday/canvas-tokens-web";

            const color = cssVar(system.color.fg.default);
            const fontSize = cssVar(system.fontSize.subtext.small);
          `;

        expectTransform(input, expected);
      });

      it('should transform type levels to object with system color', () => {
        const input = stripIndent`
            import { type } from "@workday/canvas-kit-react/tokens";

            const styles = css({
              ...type.levels.subtext.small,
            });
          `;

        const expected = stripIndent`
            import { cssVar } from "@workday/canvas-kit-styling";
            import { system } from "@workday/canvas-tokens-web";

            const styles = css({
              ...system.type.subtext.small,
              color: cssVar(system.color.fg.default)
            });
          `;

        expectTransform(input, expected);
      });
    });
  });

  describe('Depth', () => {
    it('should transform depth token to object with boxShadow property', () => {
      const input = stripIndent`
          import { depth } from "@workday/canvas-kit-react/tokens";

          const depth = depth[1];
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const depth = {
            boxShadow: cssVar(system.depth[1])
          };
        `;

      expectTransform(input, expected);
    });

    it('should transform aliased depth token to object with boxShadow property', () => {
      const input = stripIndent`
          import { depth as canvasDepth } from "@workday/canvas-kit-react/tokens";

          const depth = canvasDepth[1];
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const depth = {
            boxShadow: cssVar(system.depth[1])
          };
        `;

      expectTransform(input, expected);
    });

    it('should transform depth token boxShadow property to cssVar', () => {
      const input = stripIndent`
          import { depth } from "@workday/canvas-kit-react/tokens";

          const depth = depth[1].boxShadow;
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const depth = cssVar(system.depth[1]);
        `;

      expectTransform(input, expected);
    });

    it('should transform depth token spread in css object', () => {
      const input = stripIndent`
          import { depth as canvasDepth } from "@workday/canvas-kit-react/tokens";

          const styles = css({
            ...depth[1],
            color: 'red'
          });
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const styles = css({
            boxShadow: cssVar(system.depth[1]),
            color: 'red'
          });
        `;

      expectTransform(input, expected);
    });

    it('should transform depth token 0 to none boxShadow', () => {
      const input = stripIndent`
          import { depth } from "@workday/canvas-kit-react/tokens";

          const styles = css({
            ...depth[0],
          });
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const styles = css({
            boxShadow: "none"
          });
        `;

      expectTransform(input, expected);
    });

    it('should transform depth token 0 to object with none boxShadow', () => {
      const input = stripIndent`
         import { depth } from "@workday/canvas-kit-react/tokens";

         const depth = depth[0];
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const depth = {
            boxShadow: "none"
          };
        `;

      expectTransform(input, expected);
    });

    it('should transform depth token in nested css selector', () => {
      const input = stripIndent`
          import { depth as canvasDepth } from "@workday/canvas-kit-react/tokens";

          const styles = css({
            '&:hover': canvasDepth[1]
          });
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          const styles = css({
            '&:hover': {
              boxShadow: cssVar(system.depth[1])
            }
          });
        `;

      expectTransform(input, expected);
    });

    it('should transform depth in component props', () => {
      const input = stripIndent`
          import { depth } from "@workday/canvas-kit-react/tokens";
          
          <>
            <Component depth={depth[1]} />
            <OtherComponent css={{...depth[1]}} />
          </>
        `;

      const expected = stripIndent`
          import { cssVar } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

          <>
            <Component depth={{
              boxShadow: cssVar(system.depth[1])
            }} />
            <OtherComponent css={{
              boxShadow: cssVar(system.depth[1])
            }} />
          </>
        `;

      expectTransform(input, expected);
    });
  });
});
