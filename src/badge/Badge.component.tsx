import React from 'react';
import {View, Text, type ViewProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';

import {styles} from './badge.styles';
import {useTheme} from '../theme/useTheme.hook';
import {useTypography} from '../typography/useTypography.component';

export enum BadgeSize {
  BIG = 'BIG',
  SMALL = 'SMALL',
}

export interface BadgeProps extends ViewProps {
  value?: string;
  size?: BadgeSize;
  valueStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({value, size = BadgeSize.BIG, style, valueStyle, ...props}) => {
  const {error} = useTheme();
  const {labelSmall} = useTypography();

  const shapeStyleMap: Record<BadgeSize, ViewStyle> = {
    [BadgeSize.BIG]: styles.big,
    [BadgeSize.SMALL]: styles.small,
  };

  return (
    <View style={[styles.container, shapeStyleMap[size], {backgroundColor: error.background}, style]} {...props}>
      {size === BadgeSize.BIG && <Text style={[labelSmall, {color: error.text}, valueStyle]}>{value}</Text>}
    </View>
  );
};
