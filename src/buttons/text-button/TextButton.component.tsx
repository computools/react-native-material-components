import React, {type ReactNode} from 'react';
import {TouchableOpacity, Text, type TouchableOpacityProps, type StyleProp, type TextStyle} from 'react-native';

import {styles} from './text-button.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {useTypography} from '../../typography/useTypography.component';

export interface TextButtonProps extends TouchableOpacityProps {
  title: string;

  prepend?: ReactNode;
  append?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
}

export const TextButton: React.FC<TextButtonProps> = ({title, append, prepend, titleStyle, style, ...props}) => {
  const {primary, surface} = useTheme();
  const {labelLarge} = useTypography();

  return (
    <TouchableOpacity style={[styles.container, style]} hitSlop={16} {...props}>
      {prepend}
      <Text style={[labelLarge, {color: props.disabled ? surface.text : primary.background}, titleStyle]}>{title}</Text>
      {append}
    </TouchableOpacity>
  );
};
