import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity, View, type TouchableOpacityProps, StyleSheet} from 'react-native';
import Animated, {useSharedValue, withTiming, useAnimatedStyle, interpolate} from 'react-native-reanimated';

import {styles} from './nav-bar-item.styles';
import {type NavBarRoute} from '../NavBar.component';
import {Badge} from '../../../badge/Badge.component';
import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {useTypography} from '../../../typography/useTypography.component';

interface NavBarItemProps<T> extends Omit<TouchableOpacityProps, 'onPress'> {
  route: NavBarRoute<T>;
  focused: boolean;
  fixedLabelVisibility: boolean;

  focusAnimDuration?: number;

  onPress: (routeName: string) => void;
}

const DEFAULT_LABEL_SIZE = 12;

export const NavBarItem = <T extends IconProps>({
  route,
  focused,
  fixedLabelVisibility,
  focusAnimDuration = 150,
  onPress,
  style,
  ...props
}: NavBarItemProps<T>) => {
  const {surface, secondaryContainer} = useTheme();
  const {labelMediumProminent, labelMedium} = useTypography();

  const active = useSharedValue(Number(focused));

  useEffect(() => {
    active.value = withTiming(Number(focused), {duration: focusAnimDuration});
  }, [focused, focusAnimDuration]);

  const iconContainerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: active.value,
      transform: [{scale: interpolate(active.value, [0, 1], [0.3, 1])}],
    }),
    []
  );

  const labelContainerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: active.value,
      transform: [{translateY: interpolate(active.value, [0, 1], [labelMedium.fontSize ?? DEFAULT_LABEL_SIZE, 0])}],
    }),
    [fixedLabelVisibility]
  );

  const Icon = focused ? route.selectedIcon : route.icon;

  const [iconColor, labelColor, labelTypography] = focused
    ? [secondaryContainer.text, surface.text, labelMediumProminent]
    : [surface.textVariant, surface.textVariant, labelMedium];

  const onRouteButtonPress = useCallback(() => onPress(route.name), [route, onPress]);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onRouteButtonPress} hitSlop={12} {...props}>
      <View style={[styles.iconWithBadge]}>
        <Animated.View
          style={[styles.iconWithBadge, {backgroundColor: secondaryContainer.background}, StyleSheet.absoluteFillObject, iconContainerAnimatedStyle]}
        />
        {route.showBadge ? <Badge size={route.badgeSize} value={route.badge} style={styles.badge} /> : null}
        <Icon size={24} color={iconColor} {...((route.iconProps as T) ?? {})} />
      </View>
      {route.label?.length ? (
        <Animated.Text style={[labelTypography, {color: labelColor}, fixedLabelVisibility ? {} : labelContainerAnimatedStyle]}>
          {route.label}
        </Animated.Text>
      ) : null}
    </TouchableOpacity>
  );
};
