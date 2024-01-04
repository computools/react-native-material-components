import {View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {styles} from './linear-activity-indicator.styles';
import {Dimensions} from 'react-native';

const TRACK_BACKGROUND_COLOR = '#d1d1d1';
const INDICATOR_BACKGROUND_COLOR = '#000000';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const LinearActivityIndicator: React.FC = () => {
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withRepeat(withDelay(750, withTiming(1, {duration: 1500, easing: Easing.inOut(Easing.ease)})), -1, false, () => {
      anim.value = 1;
    });
  }, []);

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    // start: interpolate(anim.value, [0, 1], [-SCREEN_WIDTH / 2, SCREEN_WIDTH], Extrapolation.CLAMP),
    // width: SCREEN_WIDTH / 2,
    start: interpolate(anim.value, [0, 1], [SCREEN_WIDTH, 0], Extrapolation.CLAMP),
    end: interpolate(anim.value, [0, 1], [SCREEN_WIDTH, 0], Extrapolation.CLAMP),
  }));

  return (
    <View style={[styles.track, {backgroundColor: TRACK_BACKGROUND_COLOR}]}>
      <Animated.View style={[styles.indicator, {backgroundColor: INDICATOR_BACKGROUND_COLOR}, indicatorAnimatedStyle]} />
    </View>
  );
};
