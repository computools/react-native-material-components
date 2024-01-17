import {Circle, G, Svg} from 'react-native-svg';
import React, {useCallback, useEffect} from 'react';
import {type ColorValue, type ViewProps, View} from 'react-native';
import Animated, {Easing, useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated';

import {useTheme} from '../../theme/useTheme.hook';
import {styles} from './circular-activity-indicator.styles';

export interface CircularActivityIndicatorProps extends ViewProps {
  progress?: number;

  size?: number;
  strokeWidth?: number;

  trackColor?: ColorValue;
  indicatorColor?: ColorValue;

  determinateAnimationDuration?: number;
  indeterminateAnimationDuration?: number;
}

const CIRCUMFERENCE = 120;
const STROKE_WIDTH_COEFF = 0.04;
const TRANSPARENT_COLOR = 'transparent';

const DETERMINATE_ANIMATION_DURATION = 1000;
const INDETERMINATE_ANIMATION_DURATION = 800;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularActivityIndicator: React.FC<CircularActivityIndicatorProps> = ({
  progress,

  trackColor,
  indicatorColor,

  strokeWidth,
  size = CIRCUMFERENCE,

  determinateAnimationDuration = DETERMINATE_ANIMATION_DURATION,
  indeterminateAnimationDuration = INDETERMINATE_ANIMATION_DURATION,

  style,
  ...props
}) => {
  const appliedStrokeWidth = strokeWidth ?? size * STROKE_WIDTH_COEFF;
  const radius = size / (2 * Math.PI);
  const halfCircle = radius + appliedStrokeWidth;
  const diameter = 2 * halfCircle;

  const {primary} = useTheme();

  const rotate = useSharedValue(0);
  const indicatorProgress = useSharedValue(0);

  const animatedViewStyle = useAnimatedStyle(
    () => ({
      transform: [{rotate: `${rotate.value}deg`}],
    }),
    []
  );

  const animatedCircleProps = useAnimatedProps(
    () => ({
      strokeDashoffset: size * (1 - indicatorProgress.value),
    }),
    []
  );

  useEffect(() => {
    if (typeof progress === 'undefined') {
      startIndeterminateAnimation();
    }

    if (typeof progress === 'number') {
      indicatorProgress.value = withTiming(progress / 100, {duration: determinateAnimationDuration, easing: Easing.linear});
    }
  }, [progress]);

  const startIndeterminateAnimation = useCallback(() => {
    indicatorProgress.value = withRepeat(
      withSequence(
        withTiming(0.7, {duration: indeterminateAnimationDuration / 1.25}),
        withTiming(0.1, {duration: indeterminateAnimationDuration * 2})
      ),
      -1,
      true
    );
    rotate.value = withRepeat(withTiming(360, {duration: indeterminateAnimationDuration, easing: Easing.linear}), -1);
  }, []);

  return (
    <View style={[styles.container, style]} {...props}>
      <Animated.View style={animatedViewStyle}>
        <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
          <G origin={halfCircle} rotation="-90">
            <Circle cx="50%" cy="50%" r={radius} stroke={trackColor ?? TRANSPARENT_COLOR} fill={TRANSPARENT_COLOR} strokeWidth={strokeWidth} />
            <AnimatedCircle
              cx="50%"
              cy="50%"
              r={radius}
              animatedProps={animatedCircleProps}
              strokeWidth={appliedStrokeWidth}
              stroke={indicatorColor ?? primary.background}
              fill={TRANSPARENT_COLOR}
              strokeDasharray={size}
            />
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
};
