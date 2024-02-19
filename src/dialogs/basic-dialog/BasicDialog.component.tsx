import React, {useEffect, type PropsWithChildren} from 'react';
import {type ViewProps, type StyleProp, type ViewStyle} from 'react-native';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {styles} from './basic-dialog.styles';
import {useTheme} from '../../theme/useTheme.hook';

interface Props extends ViewProps {
  animationDuration?: number;
  overlayStyle?: StyleProp<ViewStyle>;

  onClose?: () => void;
}

const DEFAULT_ANIMATION_DURATION = 300;

export const BasicDialog: React.FC<PropsWithChildren<Props>> = ({
  onClose,

  style,
  children,
  overlayStyle,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  ...props
}) => {
  const appearAnim = useSharedValue(0);
  const {scrim, surfaceContainer} = useTheme();

  useEffect(() => {
    appearAnim.value = withTiming(1, {duration: animationDuration});
  }, []);

  const overlayAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(appearAnim.value, [0, 1], [0, 0.32]),
    }),
    []
  );

  const dialogAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{scale: interpolate(appearAnim.value, [0, 1], [0.3, 1])}],
    }),
    []
  );

  return (
    <>
      <Animated.View onTouchEnd={onClose} style={[styles.overlay, {backgroundColor: scrim}, overlayAnimatedStyle, overlayStyle]} />
      <Animated.View style={[styles.dialog, {backgroundColor: surfaceContainer.backgroundHigh}, dialogAnimatedStyle, style]} {...props}>
        {children}
      </Animated.View>
    </>
  );
};
