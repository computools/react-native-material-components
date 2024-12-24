import React, {useMemo} from 'react';
import Animated, {useAnimatedStyle, type SharedValue} from 'react-native-reanimated';
import {Pressable, type PressableProps, type StyleProp, type ViewStyle} from 'react-native';

import {styles} from './slider-track-point.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {convertToRGBA} from '../../../utils/convert-to-rgba';

interface SliderTrackProps extends Omit<PressableProps, 'onPress'> {
  value: number;
  disabled: boolean;
  selectedValue: SharedValue<number> | SharedValue<number[]>;

  style?: StyleProp<ViewStyle>;
  disableColorChange?: boolean;

  onPress: (value: number) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SliderTrackPoint: React.FC<SliderTrackProps> = ({
  value,
  disabled,
  selectedValue,
  disableColorChange = false,
  onPress,
  style,
  ...props
}) => {
  const {secondaryContainer, surface} = useTheme();

  const [selectedTrackPointColor, unselectedTrackPointColor] = useMemo(
    () =>
      disabled
        ? [convertToRGBA(surface.textInverse as string, 0.66), convertToRGBA(surface.text as string, 0.38)]
        : [secondaryContainer.background, secondaryContainer.text],
    [disabled, surface]
  );

  const trackPointAnimatedColorStyle = useAnimatedStyle(
    () => ({
      backgroundColor: !disableColorChange && isTrackPointSelected(value, selectedValue.value) ? selectedTrackPointColor : unselectedTrackPointColor,
    }),
    [disableColorChange, value, selectedTrackPointColor, unselectedTrackPointColor]
  );

  const handleTrackPointPress = () => onPress(value);

  return (
    <AnimatedPressable
      hitSlop={16}
      onPress={handleTrackPointPress}
      style={[styles.trackPoint, trackPointAnimatedColorStyle, style]}
      disabled={disabled}
      {...props}
    />
  );
};

const isTrackPointSelected = (pointValue: number, sliderValue: number | number[]) => {
  'worklet';

  if (typeof sliderValue === 'number') {
    return sliderValue >= pointValue;
  } else if (typeof sliderValue[0] !== 'undefined' && typeof sliderValue[1] !== 'undefined') {
    return pointValue >= sliderValue[0] && pointValue <= sliderValue[1];
  }

  return false;
};
