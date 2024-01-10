import React, {createContext, type ReactNode} from 'react';

import {LightTheme} from './theme';
import {type Theme} from './theme.types';

export const ThemeContext = createContext<Theme>(LightTheme);

export interface ThemeContainerProps {
  children: ReactNode;
  theme?: Theme;
}

export const ThemeContainer: React.FC<ThemeContainerProps> = ({children, theme = LightTheme}) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
