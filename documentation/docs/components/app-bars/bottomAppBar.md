# Bottom App Bar

The ```Bottom App Bar``` is a Material Design component that provides a fixed position at the bottom of the screen, typically used to hold important actions and icons, like navigation buttons and floating action buttons (FAB). It also allows for scroll-based animations and can react to scroll direction to hide or show itself dynamically.

<img src="https://ik.imagekit.io/Computools/rn-material-components/bottom-app-bar.gif?updatedAt=1734086950022" style="height: 700px;" alt="bottom app bar" />

## Component Overview
The ```Bottom App Bar``` typically houses action buttons, such as a FAB (Floating Action Button), and offers a simple, sleek interface for managing actions. It can animate based on the scroll direction, hiding itself when scrolling down and showing up when scrolling up, making it a useful component in applications with long content.

The ```Bottom App Bar``` works with scrolling content and adjusts its visibility based on user scroll actions. You can pass custom icons for the FAB and control the animation with shared values.

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ----|
| iconButtons | Required: List of icon buttons to display in the bar | IconButtonProps[] | - |
| scrollDirection | Direction of scroll (UP or DOWN) | ScrollDirection | UP |
| FabIcon | Pass an icon to show for the FAB | React.FC | - |
| fabLabel | Label for the FAB button | string | - |
| animationDelay | Delay before animation starts | number | 80 |
| animationDumping | Dumping factor for animation | number | 20 |
| onFabPress | Function to call when FAB is pressed | () => void | - |

## Component Usage

```
import React from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { BottomAppBar } from '@computools/react-native-material-components';

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
      <BottomAppBar scrollDirection={scrollDirection} />
    </>
  );
};
```
