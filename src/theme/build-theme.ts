import {MaterialTheme} from './theme';
import {getPalette} from './get-palette';
import type {ThemeColors} from './theme.types';

export const defaultThemeColors: ThemeColors = {
  primary: '#6750A4',
  secondary: '#625B71',
  tertiary: '#7D5260',
  error: '#B3261E',
  neutral: '#605D64',
  neutralVariant: '#605D66',
};

export const buildThemesFromColors = (themeColors: ThemeColors) => {
  const palette = getPalette(themeColors);

  const lightTheme = MaterialTheme.generateLightTheme(palette);
  const darkTheme = MaterialTheme.generateDarkTheme(palette);

  return {lightTheme, darkTheme};
};

export const {lightTheme: LightTheme, darkTheme: DarkTheme} = buildThemesFromColors(defaultThemeColors);
