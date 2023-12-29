import {StyleSheet} from 'react-native';

const HALF = 0.5;
const INDICATOR_SIZE_COEFICIENT = 0.65;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioButton: {
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
  },
});

export const getRadioButtonFrameStyles = (size: number) => {
  const indicatorSize = INDICATOR_SIZE_COEFICIENT * size;
  const indicatorRadius = indicatorSize * HALF;
  const radioButtonRadius = size * HALF;

  return StyleSheet.create({
    radioButton: {
      width: size,
      height: size,
      borderRadius: radioButtonRadius,
    },
    indicator: {
      width: indicatorSize,
      height: indicatorSize,
      borderRadius: indicatorRadius,
    },
  });
};
