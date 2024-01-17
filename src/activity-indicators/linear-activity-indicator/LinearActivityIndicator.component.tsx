import React, {useCallback, useEffect} from 'react';
import {type ColorValue, type ViewProps, View} from 'react-native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming} from 'react-native-reanimated';

import {useTheme} from '../../theme/useTheme.hook';
import {styles} from './linear-activity-indicator.styles';

const TRACK_HEIGHT = 4;
const INDICATOR_WIDTH_COEFF = 0.7;

const DETERMINATE_ANIMATION_DURATION = 1000;
const INDETERMINATE_ANIMATION_DURATION = 1500;

interface LinearActivityIndicatorProps extends ViewProps {
  progress?: number;

  trackHeight?: number;
  indicatorWidthCoeff?: number;

  trackColor?: ColorValue;
  indicatorColor?: ColorValue;

  determinateAnimationDuration?: number;
  indeterminateAnimationDuration?: number;
}

export const LinearActivityIndicator: React.FC<LinearActivityIndicatorProps> = ({
  progress,

  trackColor,
  indicatorColor,

  trackHeight = TRACK_HEIGHT,
  indicatorWidthCoeff = INDICATOR_WIDTH_COEFF,

  determinateAnimationDuration = DETERMINATE_ANIMATION_DURATION,
  indeterminateAnimationDuration = INDETERMINATE_ANIMATION_DURATION,

  style,
  ...props
}) => {
  const {primary, surfaceContainer} = useTheme();

  const position = useSharedValue(0);
  const indicatorProgress = useSharedValue(0);

  const indicatorAnimatedStyle = useAnimatedStyle(
    () => ({
      width: `${indicatorProgress.value * 100}%`,
      start: `${position.value * 100}%`,
    }),
    []
  );

  useEffect(() => {
    if (typeof progress === 'undefined') {
      startIndererminateAnimation();
    }

    if (typeof progress === 'number') {
      indicatorProgress.value = withTiming(progress / 100, {duration: determinateAnimationDuration, easing: Easing.linear});
    }
  }, [progress, determinateAnimationDuration]);

  const startIndererminateAnimation = useCallback(() => {
    indicatorProgress.value = withRepeat(
      withDelay(
        indeterminateAnimationDuration * 0.2,
        withSequence(
          withTiming(indicatorWidthCoeff, {
            duration: indeterminateAnimationDuration * 0.4,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {duration: indeterminateAnimationDuration * 0.4, easing: Easing.in(Easing.ease)})
        )
      ),
      -1,
      true
    );
    position.value = withRepeat(withDelay(indeterminateAnimationDuration * 0.4, withTiming(1, {duration: indeterminateAnimationDuration * 0.6})), -1);
  }, [indeterminateAnimationDuration, indicatorWidthCoeff]);

  return (
    <View style={[styles.track, {backgroundColor: trackColor ?? surfaceContainer.backgroundHighest, height: trackHeight}, style]} {...props}>
      <Animated.View style={[styles.indicator, {backgroundColor: indicatorColor ?? primary.background}, indicatorAnimatedStyle]} />
    </View>
  );
};
