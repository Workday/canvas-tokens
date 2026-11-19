import React from 'react';
import {Table} from '@workday/canvas-kit-react/table';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {checkIcon, exclamationTriangleIcon} from '@workday/canvas-system-icons-web';
import {token as tokenVar} from '@workday/canvas-tokens-web/token';

import {Theme} from '../ThemeControl';
import {toOklch} from '../../util';
import {DescriptionCell} from './DescriptionCell';
import {ExampleCell} from './ExampleCell';
import {SwatchCell} from './SwatchCell';
import {getCssVar} from './tokenNames';
import {SDToken, TokenLevel} from './types';

const StatusCell = ({isDeprecated}: {isDeprecated?: boolean}) => (
  <Table.Cell>
    <Tooltip title={isDeprecated ? 'Deprecated' : 'Active'}>
      <SystemIcon
        icon={isDeprecated ? exclamationTriangleIcon : checkIcon}
        color={tokenVar(isDeprecated ? 'color.fg.danger.default' : 'color.fg.success.default')}
      />
    </Tooltip>
  </Table.Cell>
);

type TokenRowProps = {
  token: SDToken;
  group: string;
  isDark?: boolean;
  theme?: Theme;
  level?: TokenLevel;
};

export const TokenRow = ({token, group, isDark, theme, level}: TokenRowProps) => {
  const swatchRef = React.useRef<HTMLDivElement>(null);
  const rowRef = React.useRef<HTMLTableRowElement>(null);
  const [computed, setComputed] = React.useState<string>();

  // Read the computed value from the CSS, so it reflects the active theme and color mode
  React.useLayoutEffect(() => {
    if (token.$type === 'color' && swatchRef.current) {
      const css = getComputedStyle(swatchRef.current).backgroundColor;
      // Show the raw CSS when it can't be converted; DescriptionCell then hides hex and rgba
      setComputed(toOklch(css) ?? css);
    } else if (token.$type === 'shadow' && rowRef.current) {
      // Composite shadows aren't resolved in the token data for every theme, so let the browser resolve the variable
      const probe = document.createElement('div');
      probe.style.boxShadow = getCssVar(token, level);
      rowRef.current.appendChild(probe);
      setComputed(getComputedStyle(probe).boxShadow);
      probe.remove();
    }
  }, [token, level, theme, isDark]);

  return (
    <Table.Row ref={rowRef}>
      <Table.Cell>
        {token.$type === 'color' || token.$type === 'gradient' ? (
          <SwatchCell
            token={token}
            isDark={isDark}
            theme={theme}
            swatchRef={swatchRef}
            computed={computed}
          />
        ) : (
          <ExampleCell token={token} level={level} />
        )}
      </Table.Cell>
      <DescriptionCell
        token={token}
        group={group}
        level={level}
        theme={theme}
        isDark={isDark}
        computed={computed}
      />
      <StatusCell isDeprecated={token.$deprecated} />
    </Table.Row>
  );
};
