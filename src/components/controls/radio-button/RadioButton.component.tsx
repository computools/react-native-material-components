import React, {type ReactNode, useCallback, useMemo, useEffect} from 'react';
import {type TouchableOpacityProps, type StyleProp, type ViewStyle, type ColorValue, TouchableOpacity} from 'react-native';
import Animated, {interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {useTheme} from '../../../theme/useTheme.hook';
import {DISABLED_OPACITY, ENABLED_OPACITY, getRadioButtonFrameStyles, styles} from './radio-button.styles';

export interface RadioButtonProps<T> extends Omit<TouchableOpacityProps, 'onPress'> {
  value: T;
  checked: boolean;

  size?: number;
  labelEnd?: ReactNode;
  labelStart?: ReactNode;
  animationDuration?: number;

  indicatorStyle?: StyleProp<ViewStyle>;
  radioButtonStyle?: StyleProp<ViewStyle>;

  radioButtonColor?: ColorValue;
  checkedRadioButtonColor?: ColorValue;

  onCheck: (value: T) => void;
}

const DEFAULT_RADIO_SIZE = 24;
const ANIMATION_DURATION = 150;

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

  radioButtonColor,
  checkedRadioButtonColor,

  onCheck,

  ...props
}: RadioButtonProps<T>) => {
  const anim = useSharedValue(0);
  const {surface, primary} = useTheme();

  const frameStyles = useMemo(() => getRadioButtonFrameStyles(size), [size]);

  const radioButtonAnimatedStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(anim.value, [0, 1], [
        radioButtonColor ?? surface.textVariant,
        checkedRadioButtonColor ?? primary.background,
      ] as string[]),
    }),
    [radioButtonColor, checkedRadioButtonColor]
  );

  const indicatorAnimatedStyle = useAnimatedStyle(
    () => ({
      width: interpolate(anim.value, [0, 1], [0, frameStyles.indicator.width]),
      height: interpolate(anim.value, [0, 1], [0, frameStyles.indicator.width]),
    }),
    []
  );

  useEffect(() => {
    anim.value = withTiming(checked ? 1 : 0, {duration: animationDuration});
  }, [checked, animationDuration]);

  const onPress = useCallback(() => onCheck(value), [value, onCheck]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {opacity: props.disabled ? DISABLED_OPACITY : ENABLED_OPACITY}, style]} {...props}>
      {labelStart}
      <Animated.View
        style={[
          styles.radioButton,
          frameStyles.radioButton,
          props.disabled ? {borderColor: surface.text} : radioButtonAnimatedStyle,
          radioButtonStyle,
        ]}>
        <Animated.View
          style={[
            {borderRadius: frameStyles.indicator.borderRadius},
            {backgroundColor: props.disabled ? surface.text : checkedRadioButtonColor ?? primary.background},
            indicatorAnimatedStyle,
            indicatorStyle,
          ]}
        />
      </Animated.View>
      {labelEnd}
    </TouchableOpacity>
  );
};
