import React, {type ReactNode, useCallback, useEffect} from 'react';
import {TouchableOpacity, type StyleProp, type ViewStyle, type TouchableOpacityProps, type ColorValue} from 'react-native';
import Animated, {interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {styles} from './switch.component';

const HANDLE_ACTIVE_BORDER_COLOR = '#ffffff';
const HANDLE__INACTIVE_BORDER_COLOR = '#ffffff';
const HANDLE__ACTIVE_BACKGROUND_COLOR = '#ffffff';
const HANDLE_INACTIVE_BACKGROUND_COLOR = '#ffffff';

const TRACK_ACTIVE_BORDER_COLOR = '#46cc2f';
const TRACK_INACTIVE_BORDER_COLOR = '#d1d1d1';
const TRACK_ACTIVE_BACKGROUND_COLOR = '#46cc2f';
const TRACK_INACTIVE_BACKGROUND_COLOR = '#d1d1d1';

export interface SwitchProps extends Omit<TouchableOpacityProps, 'onPress'> {
  value: boolean;

  labelEnd?: ReactNode;
  labelStart?: ReactNode;
  handleIcon?: ReactNode;

  hideIconOnSwitchOff?: boolean;

  handleActiveBorderColor?: ColorValue;
  handleInactiveBorderColor?: ColorValue;
  handleActiveBackgroundColor?: ColorValue;
  handleInactiveBackgroundColor?: ColorValue;

  trackActiveBorderColor?: ColorValue;
  trackInactiveBorderColor?: ColorValue;
  trackActiveBackgroundColor?: ColorValue;
  trackInactiveBackgroundColor?: ColorValue;

  style?: StyleProp<ViewStyle>;
  hanldeStyle?: StyleProp<ViewStyle>;

  onSwitch: (value: boolean) => void;
}

const SLIDE_RANGE = 25;

export const Switch: React.FC<SwitchProps> = ({
  value,

  labelEnd,
  labelStart,
  handleIcon,

  hideIconOnSwitchOff = true,

  handleActiveBorderColor = HANDLE_ACTIVE_BORDER_COLOR,
  handleInactiveBorderColor = HANDLE__INACTIVE_BORDER_COLOR,
  handleActiveBackgroundColor = HANDLE__ACTIVE_BACKGROUND_COLOR,
  handleInactiveBackgroundColor = HANDLE_INACTIVE_BACKGROUND_COLOR,

  trackActiveBorderColor = TRACK_ACTIVE_BORDER_COLOR,
  trackInactiveBorderColor = TRACK_INACTIVE_BORDER_COLOR,
  trackActiveBackgroundColor = TRACK_ACTIVE_BACKGROUND_COLOR,
  trackInactiveBackgroundColor = TRACK_INACTIVE_BACKGROUND_COLOR,

  style,
  hanldeStyle,

  onSwitch,

  ...props
}) => {
  const handleStart = useSharedValue(0);

  const handleAnimatedStyle = useAnimatedStyle(() => ({
    start: handleStart.value,
    backgroundColor: interpolateColor(handleStart.value, [0, SLIDE_RANGE], [handleInactiveBackgroundColor, handleActiveBackgroundColor] as string[]),
    borderColor: interpolateColor(handleStart.value, [0, SLIDE_RANGE], [handleInactiveBorderColor, handleActiveBorderColor] as string[]),
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(handleStart.value, [0, SLIDE_RANGE], [trackInactiveBackgroundColor, trackActiveBackgroundColor] as string[]),
    borderColor: interpolateColor(handleStart.value, [0, SLIDE_RANGE], [trackInactiveBorderColor, trackActiveBorderColor] as string[]),
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(handleStart.value, [0, SLIDE_RANGE], [Number(!hideIconOnSwitchOff), 1]),
  }));

  useEffect(() => {
    handleStart.value = withTiming(value ? SLIDE_RANGE : 0);
  }, [value]);

  const onPress = useCallback(() => onSwitch(!value), [onSwitch, value]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.container, style]} {...props}>
      {labelStart}
      <Animated.View style={[styles.track, containerAnimatedStyle, hanldeStyle]}>
        <Animated.View style={[styles.handle, handleAnimatedStyle]}>
          <Animated.View style={iconAnimatedStyle}>{handleIcon}</Animated.View>
        </Animated.View>
      </Animated.View>
      {labelEnd}
    </TouchableOpacity>
  );
};
