import type {ColorValue as RNColorValue} from 'react-native';

export type ColorHex = `#${string}`;
export type ColorRgn = `rgb(${number}, ${number}, ${number})`;
export type ColorRgba = `rgba(${number}, ${number}, ${number}, ${number})`;

export type ColorValue = ColorHex | ColorRgn | ColorRgba;

export interface ThemeColors {
  primary: ColorValue;
  secondary: ColorValue;
  tertiary: ColorValue;
  error: ColorValue;
  neutral: ColorValue;
  neutralVariant: ColorValue;
}

export interface BaseAccentThemeBlock {
  background: RNColorValue;
  text: RNColorValue;
}

export interface AccentThemeBlock extends BaseAccentThemeBlock {
  backgroundDim: RNColorValue;
  textVariant: RNColorValue;
}

export interface AccentPrimaryThemeBlock extends BaseAccentThemeBlock {
  backgroundInverse: RNColorValue;
}

export interface SurfaceTextColors {
  text: RNColorValue;
  textVariant: RNColorValue;
  textInverse: RNColorValue;
}

export interface SurfaceThemeBlock extends SurfaceTextColors {
  background: RNColorValue;
  backgroundDim: RNColorValue;
  backgroundBright: RNColorValue;
  backgroundInverse: RNColorValue;
}

export interface SurfaceContainerThemeBlock extends SurfaceTextColors {
  background: RNColorValue;
  backgroundLow: RNColorValue;
  backgroundLowest: RNColorValue;
  backgroundHigh: RNColorValue;
  backgroundHighest: RNColorValue;
}

export interface Theme {
  primary: AccentPrimaryThemeBlock;
  primaryContainer: BaseAccentThemeBlock;
  primaryFixed: AccentThemeBlock;
  secondary: BaseAccentThemeBlock;
  secondaryContainer: BaseAccentThemeBlock;
  secondaryFixed: AccentThemeBlock;
  tertiary: BaseAccentThemeBlock;
  tertiaryContainer: BaseAccentThemeBlock;
  tertiaryFixed: AccentThemeBlock;
  error: BaseAccentThemeBlock;
  errorContainer: BaseAccentThemeBlock;
  surface: SurfaceThemeBlock;
  surfaceContainer: SurfaceContainerThemeBlock;
  outline: RNColorValue;
  outlineVariant: RNColorValue;
  shadow: RNColorValue;
  scrim: RNColorValue;
}
