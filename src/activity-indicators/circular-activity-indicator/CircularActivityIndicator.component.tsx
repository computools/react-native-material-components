import type {ColorValue} from 'react-native';
import {Circle, G, Svg} from 'react-native-svg';
import React, {useCallback, useEffect} from 'react';
import Animated, {Easing, useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated';

import {styles} from './circular-activity-indicator.styles';

export interface CircularActivityIndicatorProps {
  progress?: number;

  size?: number;
  strokeWidth?: number;

  trackColor?: ColorValue;
  indicatorColor?: ColorValue;
}

const STROKE_WIDTH = 3;
const CIRCUMFERENCE = 120;

const TRACK_COLOR = '#efefef';
const INDICATOR_COLOR = '#8a8a8a';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularActivityIndicator: React.FC<CircularActivityIndicatorProps> = ({
  progress,
  size = CIRCUMFERENCE,
  strokeWidth = STROKE_WIDTH,
  trackColor = TRACK_COLOR,
  indicatorColor = INDICATOR_COLOR,
}) => {
  const radius = size / (2 * Math.PI);
  const halfCircle = radius + strokeWidth;
  const diameter = 2 * halfCircle;

  const rotate = useSharedValue(0);
  const indicatorProgress = useSharedValue(0);

  const animatedCircleProps = useAnimatedProps(
    () => ({
      strokeDashoffset: size * (1 - indicatorProgress.value),
    }),
    []
  );

  const animatedViewStyle = useAnimatedStyle(
    () => ({
      transform: [{rotate: `${rotate.value}deg`}],
    }),
    []
  );

  useEffect(() => {
    if (typeof progress === 'undefined') {
      startIndeterminateAnimation();
    }
  }, []);

  useEffect(() => {
    if (typeof progress === 'number') {
      indicatorProgress.value = withTiming(progress / 100, {duration: 2000, easing: Easing.linear});
    }
  }, [progress]);

  const startIndeterminateAnimation = useCallback(() => {
    indicatorProgress.value = withRepeat(withSequence(withTiming(0.7, {duration: 800}), withTiming(0.1, {duration: 2000})), -1, true);
    rotate.value = withRepeat(withTiming(360, {duration: 900, easing: Easing.linear}), -1);
  }, []);

  return (
    <Animated.View style={[styles.container, animatedViewStyle]}>
      <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
        <G origin={halfCircle} rotation="-90">
          <Circle cx={'50%'} cy={'50%'} r={radius} stroke={trackColor} fill="transparent" strokeWidth={strokeWidth} />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            animatedProps={animatedCircleProps}
            strokeWidth={strokeWidth}
            stroke={indicatorColor}
            fill="transparent"
            strokeDasharray={size}
          />
        </G>
      </Svg>
    </Animated.View>
  );
};
