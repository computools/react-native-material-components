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
  activeIndicatorStyle?: StyleProp<ViewStyle>;

  onOuterContainerLayout?: (e: LayoutChangeEvent) => void;
}
