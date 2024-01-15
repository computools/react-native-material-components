import {StyleSheet} from 'react-native';

const HALF = 0.5;
const BORDER_WIDTH_COEFF = 0.1;
const INDICATOR_SIZE_COEFF = 0.5;

export const ENABLED_OPACITY = 1;
export const DISABLED_OPACITY = 0.38;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const getRadioButtonFrameStyles = (size: number) => {
  const indicatorSize = INDICATOR_SIZE_COEFF * size;
  const indicatorRadius = indicatorSize * HALF;
  const radioButtonRadius = size * HALF;
  const radioButtonBorderWidth = size * BORDER_WIDTH_COEFF;

  return StyleSheet.create({
    radioButton: {
      width: size,
      height: size,
      borderRadius: radioButtonRadius,
      borderWidth: radioButtonBorderWidth,
    },
    indicator: {
      width: indicatorSize,
      height: indicatorSize,
      borderRadius: indicatorRadius,
    },
  });
};
