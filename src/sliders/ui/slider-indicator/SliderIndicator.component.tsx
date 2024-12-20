import React from 'react';
import Animated, {interpolate, useAnimatedStyle, type AnimatedProps, type SharedValue} from 'react-native-reanimated';
import {View, TextInput, type ViewProps, type TextInputProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';

import {styles} from './slider-indicator.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {useTypography} from '../../../typography/useTypography.component';

interface SliderIndicatorProps extends ViewProps {
  sliding: SharedValue<number>;
  animValueProps: AnimatedProps<Pick<TextInputProps, 'value' | 'defaultValue'>>;

  thumbStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

Animated.addWhitelistedNativeProps({text: true});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const SliderIndicator: React.FC<SliderIndicatorProps> = ({animValueProps, sliding, thumbStyle, valueStyle, ...props}) => {
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
      <AnimatedTextInput
        editable={false}
        animatedProps={animValueProps}
        style={[labelLarge, styles.value, {backgroundColor: surface.backgroundInverse}, valueAnimatedStyle, {color: surface.textInverse}, valueStyle]}
      />
      <Animated.View style={[styles.thumb, {backgroundColor: primary.background}, thumbAnimatedStyle, thumbStyle]} />
    </View>
  );
};
