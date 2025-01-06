import {StyleSheet} from 'react-native';

import {type MaterialTypography} from './typography.types';

export const materialTypography = StyleSheet.create<MaterialTypography>({
  displayLarge: {
    fontSize: 57,
    letterSpacing: -0.25,
    fontFamily: 'Roboto-Regular',
  },
  displayMedium: {
    fontSize: 45,
    fontFamily: 'Roboto-Regular',
  },
  displaySmall: {
    fontSize: 36,
    fontFamily: 'Roboto-Regular',
  },
  headlineLarge: {
    fontSize: 32,
    fontFamily: 'Roboto-Regular',
  },
  headlineMedium: {
    fontSize: 28,
    fontFamily: 'Roboto-Regular',
  },
  headlineSmall: {
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
  },
  titleLarge: {
    fontSize: 22,
    fontFamily: 'Roboto-Regular',
  },
  titleMedium: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontFamily: 'Roboto-Medium',
  },
  titleSmall: {
    fontSize: 14,
    letterSpacing: 0.1,
    fontFamily: 'Roboto-Medium',
  },
  labelMedium: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: 'Roboto-Medium',
  },
  labelMediumProminent: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: 'Roboto-Bold',
  },
  labelLarge: {
    fontSize: 14,
    letterSpacing: 0.1,
    fontFamily: 'Roboto-Medium',
  },
  labelLargeProminent: {
    fontSize: 14,
    letterSpacing: 0.1,
    fontFamily: 'Roboto-Bold',
  },
  labelSmall: {
    fontSize: 11,
    letterSpacing: 0.5,
    fontFamily: 'Roboto-Medium',
  },
  bodyLarge: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'Roboto-Regular',
  },
  bodyMedium: {
    fontSize: 14,
    letterSpacing: 0.25,
    fontFamily: 'Roboto-Regular',
  },
  bodySmall: {
    fontSize: 12,
    letterSpacing: 0.4,
    fontFamily: 'Roboto-Regular',
  },
});
