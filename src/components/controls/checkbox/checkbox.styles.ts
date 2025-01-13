import {StyleSheet} from 'react-native';

const BORDER_WIDTH_COEFF = 0.1;
const BORDER_RADIUS_COEFF = 0.1;

export const ENABLED_OPACITY = 1;
export const DISABLED_OPACITY = 0.38;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const getCheckboxFrameStyles = (size: number) => {
  const borderWidth = size * BORDER_WIDTH_COEFF;
  const borderRadius = size * BORDER_RADIUS_COEFF;

  return StyleSheet.create({
    checkboxFrame: {
      height: size,
      width: size,

      borderWidth,
      borderRadius,
    },
  });
};
