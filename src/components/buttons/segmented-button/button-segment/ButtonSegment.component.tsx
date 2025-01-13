import React, {useEffect, useMemo} from 'react';
import {Pressable, type PressableProps, type StyleProp, type ViewStyle, type TextStyle, type ColorValue} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {styles} from './button-segment.styles';
import {useTheme} from '../../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {convertToRGBA} from '../../../../utils/convert-to-rgba';
import {useTypography} from '../../../../typography/useTypography.component';
import {AnimatedSelectedIcon} from './animated-selected-icon/AnimatedSelectedIcon.component';

interface ButtonSegmentProps<T, U extends IconProps> extends Omit<PressableProps, 'onPress'> {
  value: T;
  selected: boolean;
  disabled: boolean;
  multiSelectionEnabled: boolean;

  label?: string;
  withCheckmark?: boolean;
  Icon?: React.FC<U>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  iconColor?: ColorValue;
  rippleColor?: ColorValue;

  onSegmentPress: (value: T[] | ((prevValues: T[]) => T[])) => void;
}

const DEFAULT_ICON_SIZE = 18;

export const ButtonSegment = React.memo(
  <T extends any, U extends IconProps>({
    value,
    selected,
    disabled,
    Icon,
    label,
    multiSelectionEnabled,
    withCheckmark = true,
    onSegmentPress,
    iconSize = DEFAULT_ICON_SIZE,
    labelStyle,
    iconColor,
    rippleColor,
    style,
    ...props
  }: ButtonSegmentProps<T, U>) => {
    const {labelLarge} = useTypography();
    const {surface, secondaryContainer} = useTheme();

    const fill = useSharedValue(Number(selected));
    const labelDisabledColor = useMemo(() => convertToRGBA(surface.text as string, 0.38), []);

    const defaultIconColor = selected ? secondaryContainer.text : iconColor ?? surface.text;
    const appliedIconColor = disabled ? labelDisabledColor : defaultIconColor;
    const iconProps = {size: iconSize, color: appliedIconColor} as U;

    useEffect(() => {
      fill.value = withTiming(Number(selected));
    }, [selected]);

    const animatedLabelStyle = useAnimatedStyle(
      () => ({
        color: disabled ? labelDisabledColor : interpolateColor(fill.value, [0, 1], [surface.text as string, secondaryContainer.text as string]),
      }),
      [disabled]
    );

    const circleAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: fill.value,
        width: `${interpolate(fill.value, [0, 1], [0, 100])}%`,
      };
    }, []);

    const handleSegmentPress = () => {
      if (multiSelectionEnabled) {
        handleMultiplyChoosing();
      } else {
        onSegmentPress([value]);
      }
    };

    const handleMultiplyChoosing = () => {
      onSegmentPress((prevValues) => {
        const filteredCurrValuesDependsOnLength = prevValues.length === 1 ? prevValues : prevValues.filter((prevValue) => prevValue !== value);

        return selected ? filteredCurrValuesDependsOnLength : [...prevValues, value];
      });
    };

    const renderIconConditionally = () =>
      Icon ? (
        <Animated.View layout={LinearTransition} entering={FadeIn} exiting={FadeOut}>
          <Icon {...iconProps} />
        </Animated.View>
      ) : null;

    return (
      <Pressable style={[styles.container, style]} disabled={disabled} {...props} onPress={handleSegmentPress}>
        <Animated.View style={[styles.ripple, {backgroundColor: rippleColor ?? secondaryContainer.background}, circleAnimatedStyle]} />
        {withCheckmark && selected ? (
          <Animated.View layout={LinearTransition} entering={FadeIn}>
            <AnimatedSelectedIcon width={iconSize} height={iconSize} strokeWidth={2} stroke={appliedIconColor} />
          </Animated.View>
        ) : null}
        {Icon && withCheckmark && label && selected ? null : renderIconConditionally()}
        {label ? (
          <Animated.Text layout={LinearTransition} style={[labelLarge, animatedLabelStyle, labelStyle]}>
            {label}
          </Animated.Text>
        ) : null}
      </Pressable>
    );
  }
);
