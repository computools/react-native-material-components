import React from 'react';
import {type ViewProps, type ColorValue} from 'react-native';
import Animated, {FadeIn, FadeOut, type AnimatedProps} from 'react-native-reanimated';

import {DoneIcon} from '../../../icons';
import {type IconProps} from '../../../icons/icon-props';

export interface FilterChipLeadingIconProps<T> extends AnimatedProps<ViewProps> {
  size: number;
  selected: boolean;
  color: ColorValue;
  selectedColor: ColorValue;

  leadingIconProps?: T;
  customLeadingIcon?: React.FC<T>;
}

export const FilterChipLeadingIcon = <T extends IconProps>({
  size,
  color,
  selected,
  selectedColor,
  customLeadingIcon,
  leadingIconProps = {} as T,
}: FilterChipLeadingIconProps<T>) => {
  const CustomLeadingIcon = customLeadingIcon;

  const renderUnselectedLeadingIcon = () => (CustomLeadingIcon ? <CustomLeadingIcon size={size} color={color} {...leadingIconProps} /> : null);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      {selected ? <DoneIcon size={size} color={selectedColor} /> : renderUnselectedLeadingIcon()}
    </Animated.View>
  );
};
