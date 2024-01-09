import React, {useMemo, type ReactNode} from 'react';
import {View, type ColorValue, type ViewProps, Platform} from 'react-native';

import {TRANSPARENT, styles} from './card.styles';

export interface CardProps extends ViewProps {
  filled?: boolean;
  elevated?: boolean;
  outlined?: boolean;

  children?: ReactNode;

  fillColor?: ColorValue;
  outlineColor?: ColorValue;
  elevationColor?: ColorValue;
}

export const Card: React.FC<CardProps> = ({
  filled = true,
  outlined = true,
  elevated = true,

  fillColor = '#ffffff',
  outlineColor = '#efefef',
  elevationColor = '#d1d1d1',

  style,
  children,
  ...props
}) => {
  const [elevationStyle, cardColorsStyle] = useMemo(
    () => [
      elevated
        ? Platform.select({
            ios: [[styles.iosElevation, {shadowColor: elevationColor}]],
            android: [[styles.androidElevation, {shadowColor: elevationColor}]],
          })
        : {},
      {backgroundColor: filled ? fillColor : TRANSPARENT, borderColor: outlined ? outlineColor : TRANSPARENT},
    ],
    [elevated, outlined, filled]
  );

  return (
    <View style={[styles.container, elevationStyle, cardColorsStyle, style]} {...props}>
      {children}
    </View>
  );
};
