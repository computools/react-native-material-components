import React, {type ReactNode} from 'react';
import {TouchableOpacity, Text, type StyleProp, type TextStyle, type TouchableOpacityProps} from 'react-native';

import {styles} from './common-button.styles';
import {useTypography} from '../../../typography/useTypography.component';

export interface CommonButtonProps extends TouchableOpacityProps {
  title: string;

  prepend?: ReactNode;
  append?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
}

export const CommonButton: React.FC<CommonButtonProps> = ({title, prepend, append, titleStyle, style, ...props}) => {
  const {labelLarge} = useTypography();

  const containerPaddingStart = append || prepend ? 16 : 24;

  return (
    <TouchableOpacity style={[styles.container, {paddingStart: containerPaddingStart}, style]} hitSlop={16} {...props}>
      {prepend}
      <Text style={[labelLarge, titleStyle]}>{title}</Text>
      {append}
    </TouchableOpacity>
  );
};
