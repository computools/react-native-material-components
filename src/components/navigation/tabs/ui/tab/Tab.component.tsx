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
import {useTheme} from '../../../../../theme/useTheme.hook';
import type {IconProps} from '../../../../icons/icon-props';
import {DEFAULT_ICON_SIZE} from '../../../../../constants/icon';
import {Badge, BadgeSize} from '../../../../badge/Badge.component';
import {useTypography} from '../../../../../typography/useTypography.component';

export enum TabType {
  PRIMATY = 'PRIMATY',
  SECONDARY = 'SECONDARY',
}

export interface TabProps<T, Y> extends Omit<TouchableOpacityProps, 'onPress'> {
  routeName: T;
  active: boolean;

  badge?: string;
  type?: TabType;
  title?: string;
  badgeSize?: BadgeSize;
  icon?: React.FC<Y>;
  iconProps?: Y;
  badgeStyle?: StyleProp<ViewStyle>;
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
  badge,
  type = TabType.PRIMATY,
  badgeSize = BadgeSize.BIG,

  style,
  titleStyle,
  badgeStyle,
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

  const primaryTabAppliedStyle = icon ? TabType.PRIMATY : TabType.SECONDARY;
  const [badgeBaseStyle, innerContentBaseStyle] =
    type === TabType.PRIMATY
      ? [styles[`badge${primaryTabAppliedStyle}`], styles[`innerContent${primaryTabAppliedStyle}`]]
      : [styles[`badge${type}`], styles[`innerContent${TabType.SECONDARY}`]];

  return (
    <TouchableOpacity onPress={handleTabPress} style={[styles.container, style]} {...props}>
      <View onLayout={onInnerContentLayout} style={[innerContentBaseStyle, innerContentStyle]}>
        <View>
          {Icon ? <Icon color={onContainerContentColor} size={DEFAULT_ICON_SIZE} {...iconProps} /> : null}
          {badge && type === TabType.PRIMATY && Icon ? (
            <Badge
              size={badgeSize}
              value={badge}
              style={[badgeBaseStyle, {transform: [{translateX: (iconProps.size ?? DEFAULT_ICON_SIZE) - 4}]}, badgeStyle]}
            />
          ) : null}
        </View>
        {title ? <Text style={[titleSmall, {color: onContainerContentColor}, titleStyle]}>{title}</Text> : null}
        {badge && (!Icon || type === TabType.SECONDARY) ? <Badge size={badgeSize} value={badge} style={badgeBaseStyle} /> : null}
      </View>
    </TouchableOpacity>
  );
};
