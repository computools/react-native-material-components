import React from 'react';
import {View, type ViewProps} from 'react-native';

import {styles} from './divider.styles';
import {useTheme} from '../theme/useTheme.hook';

export interface DividerProps extends ViewProps {
  horizontal?: boolean;
}

export const Divider: React.FC<DividerProps> = ({horizontal = true, style, ...props}) => {
  const {outlineVariant} = useTheme();

  return <View style={[horizontal ? styles.dividerHorizontal : styles.dividerVertical, {backgroundColor: outlineVariant}, style]} {...props} />;
};
