import React from 'react';
import Animated, {useAnimatedStyle, type SharedValue} from 'react-native-reanimated';
import {Pressable, type PressableProps, type StyleProp, type ViewStyle} from 'react-native';

import {styles} from './slider-track-point.styles';
import {useTheme} from '../../../theme/useTheme.hook';

interface SliderTrackProps extends Omit<PressableProps, 'onPress'> {
  value: number;
  selectedValue: SharedValue<number>;

  style?: StyleProp<ViewStyle>;
  disableColorChange?: boolean;

  onPress: (value: number) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SliderTrackPoint: React.FC<SliderTrackProps> = ({value, selectedValue, disableColorChange = false, onPress, style, ...props}) => {
  const {secondaryContainer, primary} = useTheme();

  const handleTrackPointPress = () => onPress(value);

  const trackPointAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: !disableColorChange && selectedValue.value >= value ? secondaryContainer.background : primary.background,
    };
  });

  return (
    <AnimatedPressable
      hitSlop={16}
      onPress={handleTrackPointPress}
      style={[styles.trackPoint, {backgroundColor: secondaryContainer.text}, trackPointAnimatedStyle, style]}
      {...props}
    />
  );
};
