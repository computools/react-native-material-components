import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type LayoutChangeEvent,
  type TouchableOpacityProps,
} from 'react-native';

import {styles} from './tab.styles';
import {useTheme} from '../../../../theme/useTheme.hook';
import type {IconProps} from '../../../../icons/icon-props';
import {useTypography} from '../../../../typography/useTypography.component';

export enum TabType {
  PRIMATY = 'PRIMATY',
  SECONDARY = 'SECONDARY',
}

export interface TabProps<T, Y> extends Omit<TouchableOpacityProps, 'onPress'> {
  routeName: T;
  active: boolean;

  type?: TabType;
  title?: string;
  icon?: React.FC<Y>;
  iconProps?: Y;
  titleStyle?: StyleProp<TextStyle>;
  innerContentStyle?: StyleProp<ViewStyle>;

  onPress: (routeName: T) => void;

  onInnerContentLayout?: (e: LayoutChangeEvent) => void;
}

export const Tab = <T extends string, Y extends IconProps>({
  icon,
  title,
  active,
  routeName,
  type = TabType.PRIMATY,

  style,
  titleStyle,
  innerContentStyle,
  iconProps = {} as Y,

  onPress,
  onInnerContentLayout,

  ...props
}: TabProps<T, Y>) => {
  const {titleSmall} = useTypography();
  const {surface, primary} = useTheme();

  const Icon = icon;
  const activeContainerContentColor = type === TabType.PRIMATY ? primary.background : surface.text;
  const onContainerContentColor = active ? activeContainerContentColor : surface.textVariant;

  const handleTabPress = () => onPress(routeName);

  return (
    <TouchableOpacity onPress={handleTabPress} style={[styles.container, style]} {...props}>
      <View onLayout={onInnerContentLayout} style={[styles[type], innerContentStyle]}>
        {Icon ? <Icon color={onContainerContentColor} size={24} {...iconProps} /> : null}
        {title ? <Text style={[titleSmall, {color: onContainerContentColor}, titleStyle]}>{title}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};
