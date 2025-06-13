import {stripIndent} from 'common-tags';
import {expectTransformFactory} from '../../utils';
import transform from '../migrateColorTokens';

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
    it('should convert color tokens to base tokens', () => {
      const input = stripIndent`
          import { colors } from "@workday/canvas-kit-react/tokens";

          const color = colors.blueberry400;
        `;

      const expected = stripIndent`
          import { base } from "@workday/canvas-tokens-web";
          import { cssVar } from "@workday/canvas-kit-styling";

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
          import { base } from "@workday/canvas-tokens-web";

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
          import { createStyles } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

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
          import { createStencil } from "@workday/canvas-kit-styling";
          import { system } from "@workday/canvas-tokens-web";

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

    it('should transform color tokens in css', () => {
      const input = stripIndent`
          import { colors } from "@workday/canvas-kit-react/tokens";

          const styles = css({
            background: colors.frenchVanilla100,
            color: colors.blueberry400,
            border: \`1px solid \${colors.blueberry400}\`,
            svg: {
              fill: props.isSelected
                ? colors.blueberry400
                : colors.frenchVanilla100,
            }
          });
        `;

      const expected = stripIndent`
          import { system } from "@workday/canvas-tokens-web";
          import { cssVar } from "@workday/canvas-kit-styling";

          const styles = css({
            background: cssVar(system.color.bg.default),
            color: cssVar(system.color.fg.primary.default),
            border: \`1px solid \${cssVar(system.color.border.primary.default)}\`,
            svg: {
              fill: props.isSelected
                ? colors.blueberry400
                : colors.frenchVanilla100,
            }
          });
        `;

      expectTransform(input, expected);
    });

    it('should transform color tokens in other objects', () => {
      const input = stripIndent`
          import { createStyles } from "@workday/canvas-kit-styling";
          import { colors } from "@workday/canvas-kit-react/tokens";

          const styles = {
            default: {
              background: toggled ? colors.blueberry400 : colors.soap200,
            }
          };
        `;

      const expected = stripIndent`
          import { system } from "@workday/canvas-tokens-web";
          import { cssVar } from "@workday/canvas-kit-styling";

          const styles = {
            default: {
              background: toggled ? cssVar(system.color.fg.primary.default) : cssVar(system.color.bg.alt.soft),
            }
          };
        `;

      expectTransform(input, expected);
    });

    it('should transform color tokens in string literals', () => {
      const input = stripIndent`
          import { colors } from "@workday/canvas-kit-react/tokens";

          const styles = css\`
            background-color: \${colors.blueberry400};
            border: 1px solid \${isViewportIndex ? colors.blueberry400 : colors.licorice400};
          \`
        `;

      const expected = stripIndent`
          import { system } from "@workday/canvas-tokens-web";
          import { cssVar } from "@workday/canvas-kit-styling";

          const styles = css\`
            background-color: \${cssVar(system.color.bg.primary.default)};
            border: 1px solid \${isViewportIndex ? cssVar(system.color.border.primary.default) : cssVar(system.color.border.disabled.default)};
          \`
        `;

      expectTransform(input, expected);
    });
  });
});
