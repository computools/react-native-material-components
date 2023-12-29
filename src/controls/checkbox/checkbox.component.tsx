import React, {type ReactElement, type ReactNode, useCallback} from 'react';
import {TouchableOpacity, type TouchableOpacityProps, View, type StyleProp, type ViewStyle, type ColorValue} from 'react-native';

import {styles} from './checkbox.styles';
import {CheckmarkIcon} from '../../icons/checkmark-icon/CheckmarkIcon.component';

const CHECKBOX_BORDER_COLOR = '#d1d1d1';
const CHECKBOX_BACKGROUND_COLOR = 'transparent';
const CHECKBOX_CHECKED_BORDER_COLOR = '#46cc2f';
const CHECKBOX_CHECKED_BACKGROUND_COLOR = '#46cc2f';

export interface CheckboxProps<T> extends Omit<TouchableOpacityProps, 'onPress'> {
  value: T;
  checked: boolean;

  labelEnd?: ReactNode;
  labelStart?: ReactNode;
  checkedIcon?: ReactNode;

  checkboxBorderColor?: ColorValue;
  checkboxBackgroundColor?: ColorValue;
  checkedCheckboxBorderColor?: ColorValue;
  checkedCheckboxBackgroundColor?: ColorValue;

  size?: number;
  checkboxStyle?: StyleProp<ViewStyle>;

  onCheck: (value: T) => void;
}

const DEFAULT_CHECKBOX_SIZE = 28;
const CHECKMARK_SIZE_COEFICIENT = 0.65;

export const Checkbox: <T extends any>(props: CheckboxProps<T>) => ReactElement = <T extends any>({
  value,
  checked,

  labelEnd,
  labelStart,
  checkedIcon,

  checkboxBorderColor = CHECKBOX_BORDER_COLOR,
  checkboxBackgroundColor = CHECKBOX_BACKGROUND_COLOR,
  checkedCheckboxBorderColor = CHECKBOX_CHECKED_BORDER_COLOR,
  checkedCheckboxBackgroundColor = CHECKBOX_CHECKED_BACKGROUND_COLOR,

  style,
  checkboxStyle,
  size = DEFAULT_CHECKBOX_SIZE,

  onCheck,

  ...props
}: CheckboxProps<T>) => {
  const [backgroundColor, borderColor] = checked
    ? [checkedCheckboxBackgroundColor, checkedCheckboxBorderColor]
    : [checkboxBackgroundColor, checkboxBorderColor];

  const checkmarkSize = size * CHECKMARK_SIZE_COEFICIENT;
  const icon = checkedIcon ?? <CheckmarkIcon size={checkmarkSize} />;

  const onPress = useCallback(() => {
    onCheck(value);
  }, [onCheck, value]);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} {...props}>
      {labelStart}
      <View style={[styles.checkbox, {backgroundColor, borderColor, width: size, height: size}, checkboxStyle]}>{checked && icon}</View>
      {labelEnd}
    </TouchableOpacity>
  );
};
