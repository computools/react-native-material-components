import React, {useMemo} from 'react';
import Animated, {FadeInRight, LinearTransition, FadeOutRight} from 'react-native-reanimated';
import {TouchableOpacity, type StyleProp, type TextStyle, type TouchableOpacityProps} from 'react-native';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {EditIcon} from '../../icons/edit-icon/EditIcon.component';
import {useTypography} from '../../typography/useTypography.component';
import {getBaseFloatingButtonShape, styles} from './floating-button.styles';

export enum FloatingButtonSize {
  SMALL = 'SMALL',
  BIG = 'BIG',
}

export enum FloatingButtonType {
  SURFACE = 'SURFACE',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
}

export interface FloatingButtonProps extends TouchableOpacityProps {
  type?: FloatingButtonType;
  label?: string;
  extended?: boolean;
  Icon?: React.FC<IconProps>;
  iconProps?: IconProps;
  size?: FloatingButtonSize;
  labelStyle?: StyleProp<TextStyle>;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  label,
  iconProps,
  labelStyle,
  Icon = EditIcon,
  extended = true,
  size = FloatingButtonSize.SMALL,
  type = FloatingButtonType.PRIMARY,
  style,
  ...props
}) => {
  const {labelLarge} = useTypography();
  const {shadow, primaryContainer, surfaceContainer, secondaryContainer, tertiaryContainer, primary} = useTheme();

  const colors = useMemo(
    () => ({
      [FloatingButtonType.SURFACE]: {backgroundColor: surfaceContainer.backgroundHigh, iconColor: primary.background},
      [FloatingButtonType.PRIMARY]: {backgroundColor: primaryContainer.background, iconColor: primaryContainer.text},
      [FloatingButtonType.SECONDARY]: {backgroundColor: secondaryContainer.background, iconColor: secondaryContainer.text},
      [FloatingButtonType.TERTIARY]: {backgroundColor: tertiaryContainer.background, iconColor: tertiaryContainer.text},
    }),
    []
  );

  const [paddingStart, paddingEnd] = label && extended ? [16, 20] : [0, 0];

  return (
    <TouchableOpacity {...props}>
      <Animated.View
        layout={LinearTransition}
        style={[
          styles.container,
          {backgroundColor: colors[type].backgroundColor, shadowColor: shadow, paddingStart, paddingEnd},
          getBaseFloatingButtonShape(size).container,
          style,
        ]}>
        {Icon ? <Icon size={24} color={colors[type].iconColor} {...iconProps} /> : null}
        {label && extended ? (
          <Animated.Text layout={LinearTransition} exiting={FadeOutRight} entering={FadeInRight} style={[labelLarge, labelStyle]}>
            {label}
          </Animated.Text>
        ) : null}
      </Animated.View>
    </TouchableOpacity>
  );
};
