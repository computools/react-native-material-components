import React, {createContext, type ReactNode} from 'react';

import {buildThemesFromColors} from './theme';
import {type Theme, type ThemeColors} from './theme.types';

export const defaultThemeColors: ThemeColors = {
  primary: '#6750A4',
  secondary: '#625B71',
  tertiary: '#7D5260',
  error: '#B3261E',
  neutral: '#605D64',
  neutralVariant: '#605D66',
};

export const {light: LightTheme, dark: DarkTheme} = buildThemesFromColors(defaultThemeColors);
export const ThemeContext = createContext<Theme>(LightTheme);

export interface ThemeContainerProps {
  theme?: Theme;
  children: ReactNode;
}

export const ThemeContainer: React.FC<ThemeContainerProps> = ({children, theme = LightTheme}) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
