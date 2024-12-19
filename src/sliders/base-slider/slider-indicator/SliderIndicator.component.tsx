import React from 'react';
import {View, Text, type ViewProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';
import Animated, {interpolate, useAnimatedStyle, type SharedValue} from 'react-native-reanimated';

import {styles} from './slider-indicator.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {useTypography} from '../../../typography/useTypography.component';

interface SliderIndicatorProps extends ViewProps {
  value: number;
  sliding: SharedValue<number>;

  thumbStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  valueContainerStyle?: StyleProp<ViewStyle>;
}

export const SliderIndicator: React.FC<SliderIndicatorProps> = ({value, sliding, thumbStyle, valueStyle, valueContainerStyle, ...props}) => {
  const {labelLarge} = useTypography();
  const {surface, primary} = useTheme();

  const valueAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: sliding.value,
      transform: [{scale: sliding.value}],
      top: interpolate(sliding.value, [0, 1], [-24, -48]),
    }),
    []
  );

  const thumbAnimatedStyle = useAnimatedStyle(
    () => ({
      width: interpolate(sliding.value, [0, 1], [4, 2]),
    }),
    []
  );

  return (
    <View {...props}>
      <Animated.View style={[styles.valueContainer, {backgroundColor: surface.backgroundInverse}, valueAnimatedStyle, valueContainerStyle]}>
        <Text style={[labelLarge, {color: surface.textInverse}, valueStyle]}>{value}</Text>
      </Animated.View>
      <Animated.View style={[styles.thumb, {backgroundColor: primary.background}, thumbAnimatedStyle, thumbStyle]} />
    </View>
  );
};
