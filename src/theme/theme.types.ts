import {type ColorValue} from 'react-native';

export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  neutral: string;
  neutralVariant: string;
}

export interface BaseAccentThemeBlock {
  background: ColorValue;
  text: ColorValue;
}

export interface AccentThemeBlock extends BaseAccentThemeBlock {
  backgroundDim: ColorValue;
  textVariant: ColorValue;
}

export interface AccentPrimaryThemeBlock extends BaseAccentThemeBlock {
  backgroundInverse: ColorValue;
}

export interface SurfaceTextColors {
  text: ColorValue;
  textVariant: ColorValue;
  textInverse: ColorValue;
}

export interface SurfaceThemeBlock extends SurfaceTextColors {
  background: ColorValue;
  backgroundDim: ColorValue;
  backgroundBright: ColorValue;
  backgroundInverse: ColorValue;
}

export interface SurfaceContainerThemeBlock extends SurfaceTextColors {
  background: ColorValue;
  backgroundLow: ColorValue;
  backgroundLowest: ColorValue;
  backgroundHigh: ColorValue;
  backgroundHighest: ColorValue;
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
  outline: ColorValue;
  outlineVariant: ColorValue;
  shadow: ColorValue;
  scrim: ColorValue;
}
