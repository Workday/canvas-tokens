import React from 'react';

export type ColorMode = 'light' | 'dark';

/** Color mode of the closest `ThemeControl`; components outside of one render in light mode. */
export const ColorModeContext = React.createContext<ColorMode>('light');

export const useColorMode = () => React.useContext(ColorModeContext);
