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
  const [computed, setComputed] = React.useState<string>();

  // Read the top level token's color from the CSS, so it reflects the active theme and color mode
  React.useLayoutEffect(() => {
    const element = swatchRef.current;
    if (element && token.$type === 'color') {
      const css = getComputedStyle(element).backgroundColor;
      // Show the raw CSS when it can't be converted; DescriptionCell then hides hex and rgba
      setComputed(toOklch(css) ?? css);
    }
  }, [token, theme, isDark]);

  return (
    <Table.Row>
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
