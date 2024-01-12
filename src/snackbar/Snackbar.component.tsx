import React, {useCallback, useEffect, useImperativeHandle, useRef} from 'react';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {View, Text, TouchableOpacity, type ViewProps, type StyleProp, type ColorValue, type TextStyle} from 'react-native';

import {styles} from './snackbar.styles';
import {useTheme} from '../theme/useTheme.hook';
import {CloseIcon} from '../icons/close-icon/CloseIcon.component';

export interface SnackbarRef {
  show: () => void;
  dismiss: () => void;
}

export interface SnackbarProps extends ViewProps {
  content: string;

  action?: string;
  offset?: number;
  duration?: number;
  showCloseIcon?: boolean;

  closeIconSize?: number;
  animationDuration?: number;
  closeIconColor?: ColorValue;
  actionStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<TextStyle>;

  onActionPress?: () => void;
}

const DISAPPEAR_COEFF = 0.5;

const DEFAULT_OFFSET = 64;
const DEFAULT_ICON_SIZE = 20;
const DEFAULT_SHOW_DURATION = 2000;
const DEFAULT_ANIMATION_DURATION = 500;

export const Snackbar = React.forwardRef<SnackbarRef, SnackbarProps>(
  (
    {
      content,

      action = '',
      showCloseIcon = false,
      offset = DEFAULT_OFFSET,
      duration = DEFAULT_SHOW_DURATION,

      style,
      actionStyle,
      contentStyle,
      closeIconColor,
      closeIconSize = DEFAULT_ICON_SIZE,
      animationDuration = DEFAULT_ANIMATION_DURATION,

      onActionPress,

      ...props
    },
    ref
  ) => {
    const visibility = useSharedValue(0);
    const {primary, surface} = useTheme();
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const hideSnackbar = useCallback(() => {
      visibility.value = withTiming(0, {duration: animationDuration});

      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }, [animationDuration, timeout.current]);

    useEffect(() => hideSnackbar, []);

    useImperativeHandle(
      ref,
      () => ({
        show() {
          visibility.value = withTiming(1, {duration: animationDuration});

          timeout.current = setTimeout(() => {
            hideSnackbar();
          }, duration);
        },
        dismiss() {
          hideSnackbar();

          timeout.current = null;
        },
      }),
      [hideSnackbar, animationDuration, duration]
    );

    const snackbarAnimatedStyle = useAnimatedStyle(
      () => ({
        opacity: visibility.value,
        bottom: interpolate(visibility.value, [0, 1], [offset * DISAPPEAR_COEFF, offset]),
      }),
      [offset]
    );

    return (
      <Animated.View style={[styles.container, {backgroundColor: surface.backgroundInverse}, snackbarAnimatedStyle, style]} {...props}>
        <Text style={[{color: surface.textInverse}, styles.supportingText, contentStyle]}>{content}</Text>
        <View style={styles.actions}>
          {action.length > 0 && (
            <TouchableOpacity hitSlop={16} onPress={onActionPress}>
              <Text style={[{color: primary.backgroundInverse}, styles.mainAction, actionStyle]}>{action}</Text>
            </TouchableOpacity>
          )}
          {showCloseIcon && (
            <TouchableOpacity hitSlop={16} onPress={hideSnackbar}>
              <CloseIcon size={closeIconSize} color={closeIconColor ?? surface.text} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    );
  }
);
