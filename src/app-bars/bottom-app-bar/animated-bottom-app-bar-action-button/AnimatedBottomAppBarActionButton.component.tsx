import React from 'react';
import Animated, {withDelay, useAnimatedStyle, withSpring, type SharedValue} from 'react-native-reanimated';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {type IconButtonProps} from '../../../buttons/icon-buttons/icon-button.types';
import {StandartIconButton} from '../../../buttons/icon-buttons/standart-icon-button/StandardIconButton.component';

interface AnimatedBottomAppBarActionButtonProps<T extends IconProps> {
  index: number;
  bottomBarHeight: number;
  buttonProps: IconButtonProps<T>;

  scrollY?: SharedValue<number>;
}

export const AnimatedBottomAppBarActionButton = <T extends IconProps>({
  index,
  buttonProps,
  bottomBarHeight,
  scrollY,
}: AnimatedBottomAppBarActionButtonProps<T>) => {
  const {surface} = useTheme();

  const iconButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: !scrollY?.value ? withDelay(index * 80, withSpring(0, {damping: 20})) : withSpring(bottomBarHeight, {damping: 20})}],
  }));

  return (
    <Animated.View key={`${index}-${buttonProps.Icon.toString()}`} style={iconButtonAnimatedStyle}>
      <StandartIconButton iconProps={{color: surface.textVariant} as T} {...buttonProps} />
    </Animated.View>
  );
};
