import React, {useMemo, type PropsWithChildren} from 'react';
import {TouchableOpacity, type TouchableOpacityProps, Platform} from 'react-native';

import {styles} from './elevated-card.styles';
import {useTheme} from '../../../theme/useTheme.hook';

export const ElevatedCard: React.FC<PropsWithChildren<TouchableOpacityProps>> = ({style, children, ...props}) => {
  const {surfaceContainer, shadow} = useTheme();

  const elevationStyle = useMemo(
    () =>
      Platform.select({
        ios: [styles.iosElevation, {shadowColor: shadow}],
        android: [styles.androidElevation, {shadowColor: shadow}],
      }),
    []
  );

  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: surfaceContainer.backgroundLow}, elevationStyle, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
};
