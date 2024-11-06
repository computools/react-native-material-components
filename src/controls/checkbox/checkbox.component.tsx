import React, {type ReactElement, type ReactNode, useCallback, useMemo, useEffect} from 'react';
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {TouchableOpacity, type TouchableOpacityProps, type StyleProp, type ViewStyle, type ColorValue} from 'react-native';

import {useTheme} from '../../theme/useTheme.hook';
import {CheckSmallIcon} from '../../icons/check-small-icon/CheckSmallIcon.component';
import {DISABLED_OPACITY, ENABLED_OPACITY, getCheckboxFrameStyles, styles} from './checkbox.styles';

export interface CheckboxProps<T> extends Omit<TouchableOpacityProps, 'onPress'> {
  value: T;
  checked: boolean;

  isError?: boolean;

  labelEnd?: ReactNode;
  labelStart?: ReactNode;
  checkedIcon?: ReactNode;

  size?: number;
  errorAnimationDuration?: number;
  checkboxStyle?: StyleProp<ViewStyle>;

  errorColor?: ColorValue;
  borderColor?: ColorValue;
  checkedBorderColor?: ColorValue;
  checkedBackgroundColor?: ColorValue;

  onCheck: (value: T) => void;
}

const DEFAULT_CHECKBOX_SIZE = 24;
const CHECKMARK_SIZE_COEFF = 0.65;
const ERROR_ANIMATION_DURATION = 300;

export const Checkbox: <T extends any>(props: CheckboxProps<T>) => ReactElement = <T extends any>({
  value,
  checked,

  isError = false,

  labelEnd,
  labelStart,
  checkedIcon,

  errorColor,
  borderColor,
  checkedBorderColor,
  checkedBackgroundColor,

  style,
  checkboxStyle,
  size = DEFAULT_CHECKBOX_SIZE,
  errorAnimationDuration = ERROR_ANIMATION_DURATION,

  onCheck,

  ...props
}: CheckboxProps<T>) => {
  const errorAnim = useSharedValue(0);
  const {surface, primary, error} = useTheme();
  const {checkboxFrame} = useMemo(() => getCheckboxFrameStyles(size), [size]);

  const checkmarkSize = size * CHECKMARK_SIZE_COEFF;
  const icon = checkedIcon ?? <CheckSmallIcon size={checkmarkSize} />;

  const disabledColorStyles: ViewStyle = checked
    ? {backgroundColor: surface.text, borderColor: surface.text}
    : {backgroundColor: 'transparent', borderColor: surface.text};

  const [enabledBackgroundColor, enabledBorderColor] = checked
    ? [checkedBackgroundColor ?? primary.background, checkedBorderColor ?? primary.background]
    : ['transparent', borderColor ?? surface.textVariant];

  const checkboxColorsAnimatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(errorAnim.value, [0, 1], [
        enabledBackgroundColor,
        checked ? errorColor ?? error.background : 'transparent',
      ] as string[]),
      borderColor: interpolateColor(errorAnim.value, [0, 1], [enabledBorderColor, errorColor ?? error.background] as string[]),
    }),
    [enabledBackgroundColor, enabledBorderColor, errorColor, checked]
  );

  useEffect(() => {
    errorAnim.value = withTiming(isError ? 1 : 0, {duration: errorAnimationDuration});
  }, [isError, errorAnimationDuration]);

  const onPress = useCallback(() => {
    onCheck(value);
  }, [onCheck, value]);

  return (
    <TouchableOpacity style={[styles.container, {opacity: props.disabled ? DISABLED_OPACITY : ENABLED_OPACITY}, style]} onPress={onPress} {...props}>
      {labelStart}
      <Animated.View style={[styles.checkbox, checkboxFrame, props.disabled ? disabledColorStyles : checkboxColorsAnimatedStyle, checkboxStyle]}>
        {checked && icon}
      </Animated.View>
      {labelEnd}
    </TouchableOpacity>
  );
};
