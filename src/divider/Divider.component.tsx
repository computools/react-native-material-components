import React from 'react';
import {View, type ViewProps, type ColorValue} from 'react-native';

import {styles} from './divider.styles';

export interface DividerProps extends ViewProps {
  color?: ColorValue;
}

export const Divider: React.FC<DividerProps> = ({color = '#efefef', style, ...props}) => (
  <View style={[styles.container, {backgroundColor: color}, style]} {...props} />
);
