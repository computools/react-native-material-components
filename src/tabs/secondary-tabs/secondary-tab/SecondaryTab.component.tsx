import React from 'react';
import {Text, TouchableOpacity, type TouchableOpacityProps, type StyleProp, type TextStyle} from 'react-native';

import {styles} from './secondary-tab.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import type {IconProps} from '../../../icons/icon-props';
import {useTypography} from '../../../typography/useTypography.component';

export interface TabProps<T, Y> extends Omit<TouchableOpacityProps, 'onPress'> {
  routeName: T;
  active: boolean;

  title?: string;
  icon?: React.FC<Y>;
  iconProps?: Y;
  titleStyle?: StyleProp<TextStyle>;

  onPress: (tabName: T) => void;
}

export const SecondaryTab = <T extends string, Y extends IconProps>({
  icon,
  title,
  active,
  routeName,
  titleStyle,
  iconProps = {} as Y,
  onPress,
  style,
  ...props
}: TabProps<T, Y>) => {
  const {surface} = useTheme();
  const {titleSmall} = useTypography();

  const Icon = icon;
  const onContainerContentColor = active ? surface.text : surface.textVariant;

  const handleTabPress = () => onPress(routeName);

  return (
    <TouchableOpacity onPress={handleTabPress} style={[styles.container, style]} {...props}>
      {Icon ? <Icon color={onContainerContentColor} size={24} {...iconProps} /> : null}
      {title ? <Text style={[titleSmall, {color: onContainerContentColor}, titleStyle]}>{title}</Text> : null}
    </TouchableOpacity>
  );
};
