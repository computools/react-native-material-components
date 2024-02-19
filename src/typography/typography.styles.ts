import {StyleSheet} from 'react-native';

import {type MaterialTypography} from './typography.types';

export const materialTypography = StyleSheet.create<MaterialTypography>({
  displayLarge: {
    fontSize: 57,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: 45,
  },
  displaySmall: {
    fontSize: 36,
  },
  headlineLarge: {
    fontSize: 32,
  },
  headlineMedium: {
    fontSize: 28,
  },
  headlineSmall: {
    fontSize: 24,
  },
  titleLarge: {
    fontSize: 22,
  },
  titleMedium: {
    fontSize: 16,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontSize: 14,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    letterSpacing: 0.4,
  },
});
