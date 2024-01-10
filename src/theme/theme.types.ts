import {type ColorValue} from 'react-native';

export interface Theme {
  primary: PrimaryColors;
  secondary: SecondaryColors;
  surface: SurfaceColors;
}

interface SecondaryColors {
  main: ColorValue;
  onContainer: ColorValue;
  container: ColorValue;
  fixed: ColorValue;
  onFixed: ColorValue;
  onFixedVariant: ColorValue;
  fixedDim: ColorValue;
}

interface PrimaryColors extends SecondaryColors {
  inverse: ColorValue;
}

interface SurfaceColors {
  main: ColorValue;
  dim: ColorValue;
  bright: ColorValue;
  inverse: ColorValue;
  containerLow: ColorValue;
  containerLowest: ColorValue;
  containerHigh: ColorValue;
  containerHighest: ColorValue;
  container: ColorValue;
  outline: ColorValue;
  outlineVariant: ColorValue;
  onInverse: ColorValue;
  shadow: ColorValue;
}
