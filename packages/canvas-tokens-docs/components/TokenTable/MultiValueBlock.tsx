import React from 'react';
import {Subtext} from '@workday/canvas-kit-react/text';
import {TertiaryButton} from '@workday/canvas-kit-react/button';

import {CodeBlock} from '../CodeBlock';

export type ValueItem = {id: string; value?: string};

type MultiValueBlockProps = {
  title: string;
  items: ValueItem[];
};

export const MultiValueBlock = ({title, items}: MultiValueBlockProps) => {
  // Track the selected id, not the item, so values stay current when the theme or color mode changes
  const [selectedId, setSelectedId] = React.useState(items[0]?.id);
  const selected = items.find(item => item.id === selectedId) ?? items[0];

  if (!selected) {
    return null;
  }

  return (
    <div className="multi-value-block">
      <div>
        <Subtext size="large">{title}</Subtext>
        <div>
          {items.length > 1 &&
            items.map(item => (
              <TertiaryButton
                key={item.id}
                size="extraSmall"
                onClick={() => setSelectedId(item.id)}
                aria-pressed={selected.id === item.id}
              >
                {item.id}
              </TertiaryButton>
            ))}
        </div>
      </div>
      <CodeBlock type="copy">{selected.value ?? ''}</CodeBlock>
    </div>
  );
};
