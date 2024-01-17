import {View, type ViewProps} from 'react-native';
import React, {type PropsWithChildren} from 'react';

import {styles} from './outlined-card.styles';
import {useTheme} from '../../theme/useTheme.hook';

export const OutlinedCard: React.FC<PropsWithChildren<ViewProps>> = ({style, children, ...props}) => {
  const {surface, outlineVariant} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: surface.background, borderColor: outlineVariant}, style]} {...props}>
      {children}
    </View>
  );
};
