import React, {useCallback, useState} from 'react';
import {type LayoutChangeEvent, type StyleProp, type ViewStyle} from 'react-native';
import {SafeAreaView, type SafeAreaViewProps} from 'react-native-safe-area-context';
import Animated, {useAnimatedStyle, withSpring, type SharedValue} from 'react-native-reanimated';

import {styles} from './nav-bar.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {type BadgeSize} from '../../badge/Badge.component';
import {ScrollDirection} from '../../types/scroll-direction.type';
import {NavBarItem} from './navigation-bar-item/NavBarItem.component';

export interface NavBarRoute<T> {
  name: string;
  icon: React.FC<T>;
  selectedIcon: React.FC<T>;

  label?: string;
  badge?: string;
  showBadge?: boolean;
  badgeSize?: BadgeSize;
  iconProps?: T;
}

export interface NavBarProps<T> extends SafeAreaViewProps {
  routes: NavBarRoute<T>[];
  activeRouteName: string;

  damping?: number;
  fixedLabelVisibility?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  scrollDirection?: SharedValue<ScrollDirection>;

  onRoutePress: (route: string) => void;
}

export const NavBar = <T extends IconProps>({
  routes,
  activeRouteName,

  damping = 20,
  scrollDirection,
  fixedLabelVisibility = false,

  onRoutePress,
  onLayout,

  containerStyle,
  style,
  ...props
}: NavBarProps<T>) => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  const {surfaceContainer} = useTheme();

  const conteinerAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{translateY: withSpring(scrollDirection?.value === ScrollDirection.DOWN ? navBarHeight : 0, {damping})}],
    }),
    [navBarHeight]
  );

  const getNavBarHeight = (e: LayoutChangeEvent) => {
    setNavBarHeight(e.nativeEvent.layout.height);

    if (onLayout) {
      onLayout(e);
    }
  };

  const renderRouteButton = useCallback(
    (route: NavBarRoute<T>) => (
      <NavBarItem
        key={route.name}
        route={route}
        focused={activeRouteName === route.name}
        fixedLabelVisibility={fixedLabelVisibility}
        onPress={onRoutePress}
      />
    ),
    [activeRouteName, fixedLabelVisibility, onRoutePress]
  );

  return (
    <Animated.View style={[conteinerAnimatedStyle, containerStyle]} onLayout={getNavBarHeight}>
      <SafeAreaView
        mode="padding"
        edges={['bottom', 'left', 'right']}
        style={[styles.container, {backgroundColor: surfaceContainer.background}, style]}
        {...props}>
        {routes.map(renderRouteButton)}
      </SafeAreaView>
    </Animated.View>
  );
};
