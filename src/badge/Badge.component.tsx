import React from 'react';
import {View, Text, type ViewProps, type StyleProp, type TextStyle} from 'react-native';

import {styles} from './badge.styles';
import {useTheme} from '../theme/useTheme.hook';
import {useTypography} from '../typography/useTypography.component';

export interface BadgeProps extends ViewProps {
  value: string;

  valueStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({value, style, valueStyle, ...props}) => {
  const {error} = useTheme();
  const {labelSmall} = useTypography();

  return (
    <View style={[styles.container, {backgroundColor: error.background}, style]} {...props}>
      <Text style={[labelSmall, {color: error.text}, valueStyle]}>{value}</Text>
    </View>
  );
};
