import React, {useMemo, type ReactElement} from 'react';
import Animated, {FadeInRight, LinearTransition, FadeOutRight} from 'react-native-reanimated';
import {TouchableOpacity, type StyleProp, type TextStyle, type TouchableOpacityProps, type ViewStyle} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {EditIcon} from '../../icons/edit-icon/EditIcon.component';
import {useTypography} from '../../../typography/useTypography.component';
import {getBaseFloatingButtonShape, styles} from './floating-action-button.styles';

export enum FloatingActionButtonSize {
  SMALL = 'SMALL',
  BIG = 'BIG',
}

export enum FloatingActionButtonType {
  SURFACE = 'SURFACE',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
}

export interface FloatingActionButtonProps<T extends IconProps> extends TouchableOpacityProps {
  type?: FloatingActionButtonType;
  label?: string;
  extended?: boolean;
  Icon?: React.FC<T>;
  iconProps?: T;
  size?: FloatingActionButtonSize;
  labelStyle?: StyleProp<TextStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
}

export const FloatingActionButton = <T extends IconProps>({
  label,
  iconProps = {} as T,
  labelStyle,
  Icon = EditIcon,
  extended = true,
  innerContainerStyle,
  size = FloatingActionButtonSize.SMALL,
  type = FloatingActionButtonType.PRIMARY,
  style,
  ...props
}: FloatingActionButtonProps<T>): ReactElement => {
  const {labelLarge} = useTypography();
  const {shadow, primaryContainer, surfaceContainer, secondaryContainer, tertiaryContainer, primary} = useTheme();

  const colors = useMemo(
    () => ({
      [FloatingActionButtonType.SURFACE]: {backgroundColor: surfaceContainer.backgroundHigh, iconColor: primary.background},
      [FloatingActionButtonType.PRIMARY]: {backgroundColor: primaryContainer.background, iconColor: primaryContainer.text},
      [FloatingActionButtonType.SECONDARY]: {backgroundColor: secondaryContainer.background, iconColor: secondaryContainer.text},
      [FloatingActionButtonType.TERTIARY]: {backgroundColor: tertiaryContainer.background, iconColor: tertiaryContainer.text},
    }),
    []
  );

  const [paddingStart, paddingEnd] = label && extended ? [16, 20] : [0, 0];

  return (
    <TouchableOpacity hitSlop={8} style={[styles.container, getBaseFloatingButtonShape(size).container, style]} {...props}>
      <Animated.View
        layout={LinearTransition}
        style={[
          styles.innerContainer,
          {backgroundColor: colors[type].backgroundColor, shadowColor: shadow, paddingStart, paddingEnd},
          getBaseFloatingButtonShape(size).container,
          innerContainerStyle,
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
