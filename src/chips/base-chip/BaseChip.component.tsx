import React, {type ReactNode} from 'react';
import {TouchableOpacity, Text, type TouchableOpacityProps, type StyleProp, type TextStyle} from 'react-native';

import {styles} from './base-chip.styles';
import {useTypography} from '../../typography/useTypography.component';

export interface BaseChipProps extends TouchableOpacityProps {
  label: string;

  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  labelStyle?: StyleProp<TextStyle>;
}

export const BaseChip: React.FC<BaseChipProps> = ({label, leadingIcon, trailingIcon, style, ...props}) => {
  const {labelLarge} = useTypography();

  return (
    <TouchableOpacity style={[styles.container, style]} hitSlop={8} {...props} disabled>
      {leadingIcon}
      <Text style={[[styles.label, labelLarge]]}>{label}</Text>
      {trailingIcon}
    </TouchableOpacity>
  );
};
