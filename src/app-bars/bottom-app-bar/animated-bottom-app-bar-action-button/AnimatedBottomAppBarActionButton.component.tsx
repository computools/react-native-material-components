import React from 'react';
import Animated, {FadeInDown, FadeOut, withDelay, useAnimatedStyle, withSpring, type SharedValue} from 'react-native-reanimated';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {ScrollDirection} from '../BottomAppBar.component';
import {type IconButtonProps} from '../../../buttons/icon-buttons/icon-button.types';
import {StandartIconButton} from '../../../buttons/icon-buttons/standart-icon-button/StandardIconButton.component';

interface AnimatedBottomAppBarActionButtonProps<T extends IconProps> {
  index: number;
  bottomBarHeight: number;
  buttonProps: IconButtonProps<T>;

  animationDelay?: number;
  animationDumping?: number;
  scrollDirection?: SharedValue<ScrollDirection>;
}

export const AnimatedBottomAppBarActionButton = <T extends IconProps>({
  index,
  buttonProps,
  bottomBarHeight,
  scrollDirection,
  animationDumping = 20,
  animationDelay = 80,
}: AnimatedBottomAppBarActionButtonProps<T>) => {
  const {surface} = useTheme();

  const iconButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollDirection?.value === ScrollDirection.DOWN
            ? withSpring(bottomBarHeight, {damping: animationDumping})
            : withDelay(index * animationDelay, withSpring(0, {damping: animationDumping})),
      },
    ],
  }));

  return (
    <Animated.View
      exiting={FadeOut}
      entering={FadeInDown.damping(animationDumping).delay((index + 1) * animationDelay)}
      key={`${index}-${buttonProps.Icon.toString()}`}
      style={iconButtonAnimatedStyle}>
      <StandartIconButton iconProps={{color: surface.textVariant} as T} {...buttonProps} />
    </Animated.View>
  );
};
