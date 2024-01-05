import React, {type ReactNode, useCallback, useMemo, useEffect} from 'react';
import Animated, {interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {type TouchableOpacityProps, type StyleProp, type ViewStyle, type ColorValue, TouchableOpacity} from 'react-native';

import {getRadioButtonFrameStyles, styles} from './radio-button.styles';

export interface RadioButtonProps<T> extends Omit<TouchableOpacityProps, 'onPress'> {
  value: T;
  checked: boolean;

  size?: number;
  labelEnd?: ReactNode;
  labelStart?: ReactNode;
  animationDuration?: number;

  indicatorStyle?: StyleProp<ViewStyle>;
  radioButtonStyle?: StyleProp<ViewStyle>;

  indicatorColor?: ColorValue;
  radioButtonBorderColor?: ColorValue;
  radioButtonBackgroundColor?: ColorValue;
  checkedRadioButtonBorderColor?: ColorValue;
  checkedRadioButtonBeckgroundColor?: ColorValue;

  onCheck: (value: T) => void;
}

const DEFAULT_RADIO_SIZE = 28;
const ANIMATION_DURATION = 150;

const INDICATOR_COLOR = '#46cc2f';
const RADIO_BUTTON_BORDER_COLOR = '#d1d1d1';
const CHECKED_RADIO_BUTTON_BORDER_COLOR = '#46cc2f';

export const RadioButton = <T extends any>({
  value,
  checked,

  labelEnd,
  labelStart,

  style,
  indicatorStyle,
  radioButtonStyle,
  size = DEFAULT_RADIO_SIZE,
  animationDuration = ANIMATION_DURATION,

  indicatorColor = INDICATOR_COLOR,
  radioButtonBorderColor = RADIO_BUTTON_BORDER_COLOR,
  checkedRadioButtonBorderColor = CHECKED_RADIO_BUTTON_BORDER_COLOR,

  onCheck,

  ...props
}: RadioButtonProps<T>) => {
  const anim = useSharedValue(0);

  const frameStyles = useMemo(() => getRadioButtonFrameStyles(size), [size]);

  const radioButtonAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(anim.value, [0, 1], [radioButtonBorderColor, checkedRadioButtonBorderColor] as string[]),
  }));

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    width: interpolate(anim.value, [0, 1], [0, frameStyles.indicator.width]),
    height: interpolate(anim.value, [0, 1], [0, frameStyles.indicator.width]),
  }));

  useEffect(() => {
    anim.value = withTiming(checked ? 1 : 0, {duration: animationDuration});
  }, [checked]);

  const onPress = useCallback(() => onCheck(value), [value, onCheck]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]} {...props}>
      {labelStart}
      <Animated.View style={[styles.radioButton, frameStyles.radioButton, radioButtonAnimatedStyle, radioButtonStyle]}>
        <Animated.View
          style={[{backgroundColor: indicatorColor, borderRadius: frameStyles.indicator.borderRadius}, indicatorAnimatedStyle, indicatorStyle]}
        />
      </Animated.View>
      {labelEnd}
    </TouchableOpacity>
  );
};
