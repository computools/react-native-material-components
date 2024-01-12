import {getPalette} from './get-palette';
import {type Palette} from './palette.types';
import {type Theme, type ThemeColors} from './theme.types';

export const buildThemesFromColors = (themeColors: ThemeColors) => {
  const palette = getPalette(themeColors);

  const lightTheme = MaterialTheme.generateLightTheme(palette);
  const darkTheme = MaterialTheme.generateDarkTheme(palette);

  return {lightTheme, darkTheme};
};

class MaterialTheme {
  public static readonly generateLightTheme = (palette: Palette): Theme => ({
    primary: {
      background: palette.primary40,
      backgroundInverse: palette.primary80,
      text: palette.primary100,
    },
    primaryContainer: {
      background: palette.primary90,
      text: palette.primary10,
    },
    primaryFixed: {
      background: palette.primary90,
      backgroundDim: palette.primary80,
      text: palette.primary10,
      textVariant: palette.primary30,
    },
    secondary: {
      background: palette.secondary40,
      text: palette.secondary100,
    },
    secondaryContainer: {
      background: palette.secondary90,
      text: palette.secondary10,
    },
    secondaryFixed: {
      background: palette.tertiary90,
      backgroundDim: palette.tertiary80,
      text: palette.tertiary10,
      textVariant: palette.tertiary30,
    },
    tertiary: {
      background: palette.tertiary40,
      text: palette.tertiary100,
    },
    tertiaryContainer: {
      background: palette.tertiary90,
      text: palette.tertiary10,
    },
    tertiaryFixed: {
      background: palette.tertiary90,
      backgroundDim: palette.tertiary80,
      text: palette.tertiary10,
      textVariant: palette.tertiary30,
    },
    error: {
      background: palette.error40,
      text: palette.error100,
    },
    errorContainer: {
      background: palette.error90,
      text: palette.error10,
    },
    surface: {
      background: palette.neutral98,
      backgroundDim: palette.neutral87,
      backgroundBright: palette.neutral98,
      backgroundInverse: palette.neutral20,
      text: palette.neutral10,
      textVariant: palette.neutralVariant30,
      textInverse: palette.neutral95,
    },
    surfaceContainer: {
      background: palette.neutral94,
      backgroundLow: palette.neutral96,
      backgroundLowest: palette.neutral100,
      backgroundHigh: palette.neutral92,
      backgroundHighest: palette.neutral90,
      text: palette.neutral10,
      textVariant: palette.neutralVariant30,
      textInverse: palette.neutral95,
    },
    outline: palette.neutralVariant50,
    outlineVariant: palette.neutralVariant80,
    scrim: palette.neutral0,
    shadow: palette.neutral0,
  });

  public static readonly generateDarkTheme = (palette: Palette): Theme => ({
    primary: {
      background: palette.primary80,
      backgroundInverse: palette.primary40,
      text: palette.primary20,
    },
    primaryContainer: {
      background: palette.primary30,
      text: palette.primary90,
    },
    primaryFixed: {
      background: palette.primary90,
      backgroundDim: palette.primary80,
      text: palette.primary10,
      textVariant: palette.primary30,
    },
    secondary: {
      background: palette.secondary80,
      text: palette.secondary20,
    },
    secondaryContainer: {
      background: palette.secondary30,
      text: palette.secondary90,
    },
    secondaryFixed: {
      background: palette.tertiary90,
      backgroundDim: palette.tertiary80,
      text: palette.tertiary10,
      textVariant: palette.tertiary30,
    },
    tertiary: {
      background: palette.tertiary80,
      text: palette.tertiary20,
    },
    tertiaryContainer: {
      background: palette.tertiary30,
      text: palette.tertiary90,
    },
    tertiaryFixed: {
      background: palette.tertiary90,
      backgroundDim: palette.tertiary80,
      text: palette.tertiary10,
      textVariant: palette.tertiary30,
    },
    error: {
      background: palette.error80,
      text: palette.error20,
    },
    errorContainer: {
      background: palette.error30,
      text: palette.error90,
    },
    surface: {
      background: palette.neutral6,
      backgroundDim: palette.neutral6,
      backgroundBright: palette.neutral24,
      backgroundInverse: palette.neutral90,
      text: palette.neutral90,
      textVariant: palette.neutralVariant80,
      textInverse: palette.neutral20,
    },
    surfaceContainer: {
      background: palette.neutral4,
      backgroundLow: palette.neutral10,
      backgroundLowest: palette.neutral12,
      backgroundHigh: palette.neutral17,
      backgroundHighest: palette.neutral22,
      text: palette.neutral90,
      textVariant: palette.neutralVariant80,
      textInverse: palette.neutral20,
    },
    outline: palette.neutralVariant60,
    outlineVariant: palette.neutralVariant30,
    scrim: palette.neutral0,
    shadow: palette.neutral0,
  });
}
