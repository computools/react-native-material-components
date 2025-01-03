import React, {useMemo} from 'react';
import Animated, {interpolate, useAnimatedStyle, type AnimatedProps, type SharedValue} from 'react-native-reanimated';
import {View, TextInput, type ViewProps, type TextInputProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';

import {styles} from './slider-indicator.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {useTypography} from '../../../typography/useTypography.component';

interface SliderIndicatorProps extends ViewProps {
  disabled: boolean;
  sliding: SharedValue<number>;
  animValueProps: AnimatedProps<Pick<TextInputProps, 'value' | 'defaultValue'>>;

  valueHeight?: number;
  thumbWidthActive?: number;
  thumbWidthInactive?: number;
  thumbStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

Animated.addWhitelistedNativeProps({text: true});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const THUMB_VALUE_GAP = 4;

export const SliderIndicator: React.FC<SliderIndicatorProps> = ({
  sliding,
  disabled,
  animValueProps,

  thumbStyle,
  valueStyle,
  valueHeight = 44,
  thumbWidthActive = 2,
  thumbWidthInactive = 4,
  ...props
}) => {
  const {labelLarge} = useTypography();
  const {surface, primary} = useTheme();

  const disabledColor = useMemo(() => convertToRGBA(surface.text as string, 0.38), [surface.text]);

  const valueAnimatedStyle = useAnimatedStyle(() => {
    const topActive = -valueHeight - THUMB_VALUE_GAP;

    return {
      opacity: sliding.value,
      transform: [{scale: sliding.value}],
      top: interpolate(sliding.value, [0, 1], [topActive / 2, -valueHeight - THUMB_VALUE_GAP]),
    };
  }, [valueHeight]);

  const thumbAnimatedStyle = useAnimatedStyle(
    () => ({
      width: interpolate(sliding.value, [0, 1], [thumbWidthInactive, thumbWidthActive]),
    }),
    [thumbWidthActive, thumbWidthInactive]
  );

  return (
    <View {...props}>
      <AnimatedTextInput
        editable={false}
        animatedProps={animValueProps}
        style={[
          labelLarge,
          styles.value,
          {backgroundColor: surface.backgroundInverse, height: valueHeight},
          valueAnimatedStyle,
          {color: surface.textInverse},
          valueStyle,
        ]}
      />
      <Animated.View style={[styles.thumb, {backgroundColor: disabled ? disabledColor : primary.background}, thumbAnimatedStyle, thumbStyle]} />
    </View>
  );
};
