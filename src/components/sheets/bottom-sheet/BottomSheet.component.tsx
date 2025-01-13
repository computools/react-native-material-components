import type {StyleProp} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import React, {type ReactNode, useCallback, useImperativeHandle} from 'react';
import {useWindowDimensions, Platform, View, type ViewProps, type ViewStyle} from 'react-native';
import Animated, {withTiming, interpolate, useSharedValue, useAnimatedStyle, useAnimatedProps, type AnimatedProps} from 'react-native-reanimated';

import {styles} from './bottom-sheet.styles';
import {useTheme} from '../../../theme/useTheme.hook';

export interface BottomSheetRef {
  toggle: () => void;
  expand: () => void;
}

export interface BottomSheetProps extends ViewProps {
  header?: ReactNode;
  children?: ReactNode;

  modalHeightCoeff?: number;
  animationDuration?: number;
  headerStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  dragHandleStyle?: StyleProp<ViewStyle>;
}

const AUTO_INCREASE_RANGE = 0.3;
const SWIPE_VELOCITY_THRESHOLD = 1000;
const DEFAULT_HEIGHT_COEFF = 0.4;
const DEFAULT_ANIMATION_DURATION = 300;

export const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      header,
      children,

      style,
      headerStyle,
      backdropStyle,
      dragHandleStyle,
      modalHeightCoeff = DEFAULT_HEIGHT_COEFF,
      animationDuration = DEFAULT_ANIMATION_DURATION,

      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const {height} = useWindowDimensions();
    const {scrim, outline, surfaceContainer} = useTheme();

    const windowHeight = Platform.select({
      ios: height,
      android: height + insets.top,
      default: height,
    });
    const modalHeight = windowHeight * modalHeightCoeff;
    const [distanceToTop, autoIncreaseTresholdTop] = [windowHeight - modalHeight, windowHeight * AUTO_INCREASE_RANGE];

    const top = useSharedValue(windowHeight);
    const context = useSharedValue({diffY: windowHeight, touchStartY: 0});

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';

        top.value = withTiming(destination, {duration: animationDuration});
      },
      [animationDuration]
    );

    useImperativeHandle(
      ref,
      () => ({
        toggle: () => {
          scrollTo(top.value !== windowHeight ? windowHeight : distanceToTop);
        },
        expand: () => {
          scrollTo(insets.top);
        },
      }),
      [windowHeight]
    );

    const animatedStyle = useAnimatedStyle(
      () => ({
        top: top.value,
      }),
      []
    );

    const backgroundAnimatedStyle = useAnimatedStyle(
      () => ({
        opacity: interpolate(top.value, [windowHeight, distanceToTop], [0, 0.32]),
      }),
      [distanceToTop, windowHeight]
    );

    const backdropAnimatedProps = useAnimatedProps<Partial<AnimatedProps<ViewProps>>>(
      () => ({
        pointerEvents: top.value !== windowHeight ? 'auto' : 'none',
      }),
      [windowHeight]
    );

    const gesture = Gesture.Pan()
      .onStart((e) => {
        context.value.diffY = top.value - e.absoluteY;
        context.value.touchStartY = e.absoluteY;
      })
      .onUpdate((e) => {
        top.value = context.value.diffY + e.absoluteY;
      })
      .onEnd((e) => {
        const swipeDown = e.velocityY > SWIPE_VELOCITY_THRESHOLD && e.absoluteY > context.value.touchStartY;
        const swipeUp = e.velocityY < -SWIPE_VELOCITY_THRESHOLD;

        if (swipeDown || top.value > distanceToTop) {
          scrollTo(windowHeight);
        } else if (swipeUp || top.value < autoIncreaseTresholdTop) {
          scrollTo(insets.top);
        }
      });

    const closeModal = useCallback(() => {
      scrollTo(windowHeight);
    }, [windowHeight]);

    return (
      <>
        <Animated.View
          onTouchStart={closeModal}
          animatedProps={backdropAnimatedProps}
          style={[styles.backdrop, {backgroundColor: scrim}, backgroundAnimatedStyle, backdropStyle]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.bottomSheet, {backgroundColor: surfaceContainer.backgroundLow}, animatedStyle, style]} {...props}>
            <View style={[styles.header, headerStyle]}>
              <View style={[styles.dragHandle, {backgroundColor: outline}, dragHandleStyle]} />
              {header}
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);
