import React, {type ReactNode, useCallback, useEffect} from 'react';
import {TouchableOpacity, type StyleProp, type ViewStyle, type TouchableOpacityProps, type ColorValue} from 'react-native';
import Animated, {interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {useTheme} from '../../theme/useTheme.hook';
import {DISABLED_OPACITY, ENABLED_OPACITY, styles} from './switch.styles';

const ANIMATION_DURATION = 300;

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

  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  hanldeStyle?: StyleProp<ViewStyle>;

  onSwitch: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  value,

  labelEnd,
  labelStart,
  handleIcon,

  hideIconOnSwitchOff = true,

  handleActiveBorderColor,
  handleInactiveBorderColor,
  handleActiveBackgroundColor,
  handleInactiveBackgroundColor,

  trackActiveBorderColor,
  trackInactiveBorderColor,
  trackActiveBackgroundColor,
  trackInactiveBackgroundColor,

  style,
  trackStyle,
  hanldeStyle,
  animationDuration = ANIMATION_DURATION,

  onSwitch,

  ...props
}) => {
  const handleStart = useSharedValue(0);
  const {primary, outline, surfaceContainer, surface} = useTheme();

  const [trackDisabledColors, handleDisabledColors]: ViewStyle[] = value
    ? [
        {backgroundColor: surface.text, borderColor: surface.text},
        {backgroundColor: surface.background, borderColor: surface.background},
      ]
    : [
        {backgroundColor: surfaceContainer.backgroundHighest, borderColor: surface.text},
        {backgroundColor: surface.text, borderColor: surface.text},
      ];

  const handlePosAnimatedStyle = useAnimatedStyle(
    () => ({
      flex: handleStart.value,
    }),
    []
  );

  const handleColorsAnimatedStyle = useAnimatedStyle(
    () => ({
      start: handleStart.value,
      backgroundColor: interpolateColor(handleStart.value, [0, 1], [
        handleInactiveBackgroundColor ?? outline,
        handleActiveBackgroundColor ?? primary.text,
      ] as string[]),
      borderColor: interpolateColor(handleStart.value, [0, 1], [
        handleInactiveBorderColor ?? outline,
        handleActiveBorderColor ?? primary.text,
      ] as string[]),
    }),
    [handleInactiveBackgroundColor, handleActiveBackgroundColor, handleInactiveBorderColor, handleActiveBorderColor]
  );

  const trackAnimatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(handleStart.value, [0, 1], [
        trackInactiveBackgroundColor ?? surfaceContainer.backgroundHighest,
        trackActiveBackgroundColor ?? primary.background,
      ] as string[]),
      borderColor: interpolateColor(handleStart.value, [0, 1], [
        trackInactiveBorderColor ?? outline,
        trackActiveBorderColor ?? primary.background,
      ] as string[]),
    }),
    [trackInactiveBackgroundColor, trackActiveBackgroundColor, trackInactiveBorderColor, trackActiveBorderColor]
  );

  const iconAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(handleStart.value, [0, 1], [Number(!hideIconOnSwitchOff), 1]),
    }),
    [hideIconOnSwitchOff]
  );

  useEffect(() => {
    handleStart.value = withTiming(value ? 1 : 0, {duration: animationDuration});
  }, [value, animationDuration]);

  const onPress = useCallback(() => onSwitch(!value), [onSwitch, value]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.container, {opacity: props.disabled ? DISABLED_OPACITY : ENABLED_OPACITY}, style]}
      {...props}>
      {labelStart}
      <Animated.View style={[styles.track, props.disabled ? trackDisabledColors : trackAnimatedStyle, trackStyle]}>
        <Animated.View style={handlePosAnimatedStyle}>
          <Animated.View style={[styles.handle, props.disabled ? handleDisabledColors : handleColorsAnimatedStyle, hanldeStyle]}>
            <Animated.View style={iconAnimatedStyle}>{handleIcon}</Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      {labelEnd}
    </TouchableOpacity>
  );
};
