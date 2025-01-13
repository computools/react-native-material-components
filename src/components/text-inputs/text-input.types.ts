import {type ReactNode} from 'react';
import {type TextInputProps as RNTextInputProps, type StyleProp, type ViewStyle, type TextStyle, type LayoutChangeEvent} from 'react-native';

export interface TextInputProps<T> extends RNTextInputProps {
  label: string;

  disabled?: boolean;
  errorText?: string;
  suportingText?: string;

  leadingIconProps?: T;
  trailingIconProps?: T;
  trailingIcon?: React.FC<T>;
  leadingIcon?: React.FC<T>;

  leadingComponent?: ReactNode;
  trailingComponent?: ReactNode;

  labelStyle?: StyleProp<ViewStyle>;
  supportingTextStyle?: StyleProp<TextStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
  outerContainerStyle?: StyleProp<ViewStyle>;

  onOuterContainerLayout?: (e: LayoutChangeEvent) => void;
}

export enum TextInputColors {
  VALUE_COLOR = 'valueColor',
  CONTAINER_COLOR = 'containerColor',
  SELECTION_COLOR = 'selectionColor',
  PLACEHOLDER_COLOR = 'placeholderColor',
  LABEL_FOCUSED_COLOR = 'labelFocusedColor',
  LABEL_COLOR = 'labelFocusedColor',
  TRAILING_ICON_COLOR = 'trailingIconColor',
  LEADING_ICON_COLOR = 'leadingIconColor',
  LABEL_UNFOCUSED_COLOR = 'labelUnfocusedColor',
  SUPPORING_TEXT_COLOR = 'supportingTextColor',
  ACTIVE_INDICATOR_FOCUSED_COLOR = 'activeIndicatorFocusedColor',
  ACTIVE_INDICATOR_UNFOCUSED_COLOR = 'activeIndicatorUnfocusedColor',
}
