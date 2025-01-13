import React, {useState} from 'react';
import {type ViewProps, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {forwardRef, useImperativeHandle, type PropsWithChildren} from 'react';
import Animated, {interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {useTheme} from '../../../theme/useTheme.hook';
import {styles} from './full-screen-dialog.styles';
import {ModalBackdropWrapper} from '../../modal-backdrop-wrapper/ModalBackdropWrapper.component';

export enum AnimationType {
  SLIDE = 'SLIDE',
  FADE = 'FADE',
  ZOOM = 'ZOOM',
}

interface Props extends ViewProps {
  animationDuration?: number;
  animationType?: AnimationType;
}

export interface FullScreenDialogRef {
  show: () => void;
  close: () => void;
  isShowed: () => boolean;
}

const ANIMATION_DURATION = 330;

export const FullScreenDialog = forwardRef<FullScreenDialogRef, PropsWithChildren<Props>>(
  ({children, animationType = AnimationType.SLIDE, animationDuration = ANIMATION_DURATION, style, ...props}, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const insets = useSafeAreaInsets();
    const visibility = useSharedValue(0);
    const {surfaceContainer} = useTheme();
    const {height: windowHeight, width: windowWidth} = useWindowDimensions();

    useImperativeHandle(
      ref,
      () => ({
        show() {
          if (isClosing) {
            setIsClosing(false);
          }

          setIsVisible(true);

          visibility.value = withTiming(1, {duration: animationDuration});
        },
        close() {
          if (animationType === AnimationType.ZOOM) {
            setIsClosing(true);
          }

          visibility.value = withTiming(0, {duration: animationDuration}, () => runOnJS(setIsVisible)(false));
        },
        isShowed() {
          return Boolean(visibility.value);
        },
      }),
      [isClosing, animationType, animationDuration]
    );

    const dialogAnimatedStyle = useAnimatedStyle(() => {
      const slideAnimStyle = {
        transform: [{translateY: interpolate(visibility.value, [0, 1], [windowHeight, 0])}],
        opacity: visibility.value,
      };

      switch (animationType) {
        case AnimationType.SLIDE:
          return slideAnimStyle;
        case AnimationType.FADE: {
          return {
            opacity: visibility.value,
          };
        }
        case AnimationType.ZOOM: {
          return isClosing
            ? slideAnimStyle
            : {
                transform: [{scale: interpolate(visibility.value, [0, 1], [0.2, 1])}],
                opacity: visibility.value,
              };
        }
        default:
          return slideAnimStyle;
      }
    }, [animationType, windowHeight, isClosing]);

    return (
      <ModalBackdropWrapper visibility={visibility} visible={isVisible} backdropStyle={styles.modalBackdropWrapper}>
        <Animated.View
          style={[
            styles.container,
            {
              height: windowHeight,
              width: windowWidth,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
              backgroundColor: surfaceContainer.backgroundHigh,
            },
            dialogAnimatedStyle,
            style,
          ]}
          {...props}>
          {children}
        </Animated.View>
      </ModalBackdropWrapper>
    );
  }
);
