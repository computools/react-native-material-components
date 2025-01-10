# Nav Bar

## Overview

The ```Navigation Bar (NavBar)``` component is a customizable navigation tool that allows users to switch between different sections of an app. It supports animations on scroll, badges, and customizable icons.

<img src="https://ik.imagekit.io/Computools/rn-material-components/nav_bar.gif?updatedAt=1735922886681" style="height: 700px;" alt="nav bar" />

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| routes | Required. Array of navigation routes. | NavBarRoute<T, Y>[] | - |
| activeRouteName | Required. The name of the currently active route. | T | - |
| onRoutePress | 	Required. Function to handle route changes when a route is pressed. | (route: T) => void | - |
| damping | Controls the animation damping effect for transitions.| number | 20 |
| fixedLabelVisibility | If true, ensures labels remain visible regardless of the icon. | boolean | false |
| scrollDirection | Determines the scroll behavior (UP or DOWN). Allows hiding/showing NavBar on scroll. | ScrollDirection | - |
| containerStyle | Custom styles for the NavBar container. | ViewStyle | false |

## Route Structure

The ```routes``` property accepts an array of ```NavBarRoute``` objects. Each route is structured as follows:

```
export interface NavBarRoute<T, Y> {
  name: T;                       // Route name
  icon: React.FC<Y>;             // Icon component for the route
  selectedIcon: React.FC<Y>;     // Icon component for the active route
  label?: string;                // Optional label for the route
  badge?: string;                // Optional badge text
  showBadge?: boolean;           // Optional boolean to show/hide badge (useful if you use SMALL badge size and don't provide badge value)
  badgeSize?: BadgeSize;         // Optional size of the badge
  iconProps?: Y;                 // Optional props for the icon components
}
```

## Scroll Animation Example

To enable animation on scroll, use the ```Animated.ScrollView``` and manage the ```scrollDirection``` and ```scrollContext``` values dynamically.

```
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export const MyComponent: React.FC = () => {
  const scrollDirection = useSharedValue(ScrollDirection.UP);
  const scrollContext = useSharedValue(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = e.nativeEvent.contentOffset.y;

    if (currentOffsetY <= 0 || currentOffsetY < scrollContext.value) {
      scrollDirection.value = ScrollDirection.UP;
    } else if (currentOffsetY >= scrollContext.value) {
      scrollDirection.value = ScrollDirection.DOWN;
    }

    scrollContext.value = currentOffsetY;
  };

  return (
    <>
      <Animated.ScrollView onScroll={onScroll}>
        {/* ScrollView content */}
      </Animated.ScrollView>
      <NavBar
        scrollDirection={scrollDirection}
        routes={routes}
        activeRouteName={activeRouteName}
        onRoutePress={setRoute}
      />
    </>
  );
};
```
<img src="https://ik.imagekit.io/Computools/rn-material-components/anim_nav_bar.gif?updatedAt=1735922886792" style="height: 700px;" alt="animated nav bar" />












