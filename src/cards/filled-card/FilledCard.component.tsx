import {View, type ViewProps} from 'react-native';
import React, {type PropsWithChildren} from 'react';

import {styles} from './filled-card.styles';
import {useTheme} from '../../theme/useTheme.hook';

export const FilledCard: React.FC<PropsWithChildren<ViewProps>> = ({style, children, ...props}) => {
  const {surfaceContainer} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: surfaceContainer.backgroundHighest}, style]} {...props}>
      {children}
    </View>
  );
};
