import type {StyleProp} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import React, {type ReactNode, useCallback, useImperativeHandle} from 'react';
import {useWindowDimensions, type ViewProps, type ViewStyle} from 'react-native';
import Animated, {withTiming, interpolate, useSharedValue, useAnimatedStyle, useAnimatedProps, type AnimatedProps} from 'react-native-reanimated';

import {styles} from './side-sheet.styles';
import {useTheme} from '../../theme/useTheme.hook';

export interface SideSheetRef {
  toggle: () => void;
}

export type StickySide = 'left' | 'right';

export interface SideSheetProps extends ViewProps {
  children?: ReactNode;

  stickySide?: StickySide;
  modalWidthCoeff?: number;
  animationDuration?: number;
  backdropStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_ANIMATION_DURATION = 300;

const DEFAULT_WIDTH_COEFF = 0.85;

export const SideSheet = React.forwardRef<SideSheetRef, SideSheetProps>(
  (
    {
      children,

      style,
      backdropStyle,
      stickySide = 'right',
      modalWidthCoeff = DEFAULT_WIDTH_COEFF,
      animationDuration = DEFAULT_ANIMATION_DURATION,

      ...props
    },
    ref
  ) => {
    const {scrim, surfaceContainer} = useTheme();
    const {width: windowWidth} = useWindowDimensions();

    const modalWidth = windowWidth * modalWidthCoeff;
    const onOpenDistanceToEdge = windowWidth - modalWidth;

    const edge = useSharedValue(windowWidth);
    const diffX = useSharedValue(modalWidth);

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        edge.value = withTiming(destination, {duration: animationDuration});
      },
      [animationDuration]
    );

    useImperativeHandle(
      ref,
      () => ({
        toggle: () => {
          scrollTo(edge.value !== windowWidth ? windowWidth : onOpenDistanceToEdge);
        },
      }),
      [onOpenDistanceToEdge, windowWidth]
    );

    const leftSideSheetAnimatedStyle = useAnimatedStyle(() => ({right: edge.value}), []);
    const rightSideSheetAtyle = useAnimatedStyle(() => ({left: edge.value}), []);

    const backgroundAnimatedStyle = useAnimatedStyle(
      () => ({opacity: interpolate(edge.value, [windowWidth, onOpenDistanceToEdge], [0, 0.32])}),
      [onOpenDistanceToEdge, windowWidth]
    );

    const backdropAnimatedProps = useAnimatedProps<Partial<AnimatedProps<ViewProps>>>(
      () => ({
        pointerEvents: edge.value !== windowWidth ? 'auto' : 'none',
      }),
      [windowWidth]
    );

    const gesture = Gesture.Pan()
      .onStart((e) => {
        diffX.value = stickySide === 'right' ? e.absoluteX - edge.value : windowWidth - e.absoluteX - edge.value;
      })
      .onUpdate((e) => {
        if (stickySide === 'right') {
          edge.value = e.absoluteX - diffX.value;
        }

        if (stickySide === 'left') {
          edge.value = windowWidth - e.absoluteX - diffX.value;
        }
      })
      .onEnd(() => {
        const closeTreshold = onOpenDistanceToEdge + windowWidth * 0.2;

        if (edge.value > closeTreshold) {
          scrollTo(windowWidth);
        } else {
          scrollTo(onOpenDistanceToEdge);
        }
      });

    const closeModal = useCallback(() => {
      scrollTo(windowWidth);
    }, [windowWidth]);

    return (
      <>
        <Animated.View
          onTouchStart={closeModal}
          animatedProps={backdropAnimatedProps}
          style={[styles.backdrop, {backgroundColor: scrim}, backgroundAnimatedStyle, backdropStyle]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              styles.sideSheet,
              {backgroundColor: surfaceContainer.backgroundLow},
              stickySide === 'right' ? [styles.rightSideSheet, rightSideSheetAtyle] : [styles.leftSideSheet, leftSideSheetAnimatedStyle],
              style,
            ]}
            {...props}>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);
