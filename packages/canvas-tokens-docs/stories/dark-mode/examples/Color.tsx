import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

const v = (token: string) => `var(${token})`;
const c = system.color;

type Mode = 'light' | 'dark';

const card: React.CSSProperties = {
  background: v(c.surface.raised),
  border: `1px solid ${v(c.border.root)}`,
  borderRadius: 8,
  padding: 16,
};

const button = (background: string, color: string, border?: string): React.CSSProperties => ({
  background,
  color,
  border: border ? `1px solid ${border}` : '1px solid transparent',
  borderRadius: 8,
  padding: '8px 16px',
  font: 'inherit',
  cursor: 'pointer',
});

export const DarkMode = () => {
  const [mode, setMode] = React.useState<Mode>('light');

  return (
    // The Sana CSS applies dark values to `[data-theme="sana-canvas"][data-mode="dark"]`
    <div
      data-theme="sana-canvas"
      data-color-mode={mode}
      data-mode={mode}
      style={{
        background: v(c.surface.root),
        color: v(c.fg.root),
        border: `1px solid ${v(c.border.root)}`,
        borderRadius: 8,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3 style={{margin: 0, color: v(c.fg.strong)}}>Dashboard ({mode} mode)</h3>
        <button
          style={button(v(c.surface.contrast.root), v(c.fg.inverse))}
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        >
          Switch to {mode === 'light' ? 'dark' : 'light'}
        </button>
      </div>

      <div style={card}>
        <strong style={{color: v(c.fg.strong)}}>Card title</strong>
        <p style={{color: v(c.fg.muted.root), margin: '8px 0 16px'}}>
          Muted text on a raised surface with a default border.
        </p>
        <div style={{display: 'flex', gap: 8}}>
          <button style={button(v(c.brand.surface.primary.strong), v(c.fg.inverse))}>
            Primary
          </button>
          <button style={button('transparent', v(c.fg.root), v(c.border.input.root))}>
            Secondary
          </button>
        </div>
      </div>

      <div style={{display: 'flex', gap: 8}}>
        <span style={{...card, padding: 8, background: v(c.surface.success.root)}}>Success</span>
        <span style={{...card, padding: 8, background: v(c.surface.warning.root)}}>Warning</span>
        <span style={{...card, padding: 8, background: v(c.surface.danger.root)}}>Danger</span>
        <span style={{...card, padding: 8, background: v(c.surface.info.root)}}>Info</span>
      </div>
    </div>
  );
};
