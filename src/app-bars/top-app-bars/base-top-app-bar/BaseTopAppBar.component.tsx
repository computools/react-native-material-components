import React, {type PropsWithChildren} from 'react';
import {type ViewProps, type ColorValue} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {type SharedValue, useAnimatedStyle, interpolateColor, withTiming} from 'react-native-reanimated';

import {useTheme} from '../../../theme/useTheme.hook';
import {BASE_TOP_APP_BAR_PADDING_VERTICAL, styles} from './base-top-app-bar.styles';

export interface BaseTopAppBarProps extends ViewProps {
  scrollStatus?: SharedValue<number>;
  defaultColor?: ColorValue;
  scrolledColor?: ColorValue;
  animationDuration?: number;
}

const DEFAULT_ANIMATION_DURATION = 300;

export const BaseTopAppBar: React.FC<PropsWithChildren<BaseTopAppBarProps>> = ({
  children,
  scrollStatus,
  defaultColor,
  scrolledColor,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  style,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const {surfaceContainer, surface} = useTheme();

  const containerAnimatedStyle = useAnimatedStyle(
    () =>
      typeof scrollStatus !== 'undefined'
        ? {
            backgroundColor: withTiming(
              interpolateColor(scrollStatus.value, [0, 1], [
                defaultColor ?? surface.background,
                scrolledColor ?? surfaceContainer.background,
              ] as string[]),
              {duration: animationDuration}
            ),
          }
        : {},
    [defaultColor, scrolledColor, animationDuration]
  );

  return (
    <Animated.View style={[styles.container, {paddingTop: insets.top + BASE_TOP_APP_BAR_PADDING_VERTICAL}, containerAnimatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};
