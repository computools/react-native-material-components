import {type ViewProps} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState, type PropsWithChildren} from 'react';
import Animated, {interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {styles} from './dialog.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {ModalBackdropWrapper} from '../../modal-backdrop-wrapper/ModalBackdropWrapper.component';

export interface DialogProps extends ViewProps {
  animationDuration?: number;
}

export interface DialogRef {
  show: () => void;
  close: () => void;
  isShowed: () => boolean;
}

const DEFAULT_ANIMATION_DURATION = 220;

export const Dialog = forwardRef<DialogRef, PropsWithChildren<DialogProps>>(
  ({style, children, animationDuration = DEFAULT_ANIMATION_DURATION, ...props}, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const visibility = useSharedValue(0);
    const {surfaceContainer} = useTheme();

    useImperativeHandle(
      ref,
      () => ({
        close() {
          closeModal();
        },
        show() {
          setIsVisible(true);
          visibility.value = withTiming(1, {duration: animationDuration});
        },
        isShowed() {
          return Boolean(visibility.value);
        },
      }),
      [animationDuration]
    );

    const closeModal = () => {
      visibility.value = withTiming(0, {duration: animationDuration}, () => runOnJS(setIsVisible)(false));
    };

    const dialogAnimatedStyle = useAnimatedStyle(
      () => ({
        transform: [{scale: interpolate(visibility.value, [0, 1], [0.3, 1])}],
        opacity: visibility.value,
      }),
      []
    );

    return (
      <ModalBackdropWrapper visibility={visibility} visible={isVisible} onRequestClose={closeModal}>
        <Animated.View style={[styles.dialog, {backgroundColor: surfaceContainer.backgroundHigh}, dialogAnimatedStyle, style]} {...props}>
          {children}
        </Animated.View>
      </ModalBackdropWrapper>
    );
  }
);
