import React, {type ReactNode, useCallback, useMemo, useEffect} from 'react';
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {type TouchableOpacityProps, type StyleProp, type ViewStyle, type ColorValue, TouchableOpacity, View} from 'react-native';

import {getRadioButtonFrameStyles, styles} from './radio-button.styles';

export interface RadioButtonProps<T> extends Omit<TouchableOpacityProps, 'onPress'> {
  value: T;
  checked: boolean;

  size?: number;
  labelEnd?: ReactNode;
  labelStart?: ReactNode;

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

const RADIO_BUTTON_BORDER_COLOR = '#d1d1d1';
const CHECKED_RADIO_BUTTON_BORDER_COLOR = '#46cc2f';

const INDICATOR_COLOR = '#46cc2f';

export const RadioButton = <T extends any>({
  value,
  checked,

  labelEnd,
  labelStart,

  style,
  indicatorStyle,
  radioButtonStyle,
  size = DEFAULT_RADIO_SIZE,

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

  useEffect(() => {
    anim.value = withTiming(checked ? 1 : 0);
  }, [checked]);

  const onPress = useCallback(() => onCheck(value), [value, onCheck]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]} {...props}>
      {labelStart}
      <Animated.View style={[styles.radioButton, frameStyles.radioButton, radioButtonAnimatedStyle, radioButtonStyle]}>
        {checked && <View style={[frameStyles.indicator, {backgroundColor: indicatorColor}, indicatorStyle]} />}
      </Animated.View>
      {labelEnd}
    </TouchableOpacity>
  );
};
