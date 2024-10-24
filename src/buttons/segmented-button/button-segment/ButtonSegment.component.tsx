import React, {useEffect} from 'react';
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
import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {useTypography} from '../../../typography/useTypography.component';
import {AnimatedSelectedIcon} from './animated-selected-icon/AnimatedSelectedIcon.component';

interface ButtonSegmentProps<T> extends Omit<PressableProps, 'onPress'> {
  value: T;
  selected: boolean;
  multiSelectionEnabled: boolean;

  label?: string;
  withCheckmark?: boolean;
  Icon?: React.FC<IconProps>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  iconColor?: ColorValue;
  rippleColor?: ColorValue;

  onSegmentPress: (value: T[] | ((prevValues: T[]) => T[])) => void;
}

const DEFAULT_ICON_SIZE = 18;

export const ButtonSegment = React.memo(
  <T extends any>({
    value,
    selected,
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
  }: ButtonSegmentProps<T>) => {
    const {labelLarge} = useTypography();
    const {surface, secondaryContainer} = useTheme();

    const fill = useSharedValue(Number(selected));

    useEffect(() => {
      fill.value = withTiming(Number(selected));
    }, [selected]);

    const animatedLabelStyle = useAnimatedStyle(
      () => ({
        color: interpolateColor(fill.value, [0, 1], [surface.text as string, secondaryContainer.text as string]),
      }),
      []
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

    const renderIconConditionally = () => {
      const defaultIconColor = selected ? secondaryContainer.text : surface.text;

      return Icon ? (
        <Animated.View layout={LinearTransition} entering={FadeIn} exiting={FadeOut}>
          <Icon size={iconSize} color={iconColor ?? defaultIconColor} />
        </Animated.View>
      ) : null;
    };

    return (
      <Pressable style={[styles.container, style]} {...props} onPress={handleSegmentPress}>
        <Animated.View style={[styles.ripple, {backgroundColor: rippleColor ?? secondaryContainer.background}, circleAnimatedStyle]} />
        {withCheckmark && selected ? (
          <Animated.View layout={LinearTransition} entering={FadeIn}>
            <AnimatedSelectedIcon width={iconSize} height={iconSize} strokeWidth={2} stroke={secondaryContainer.text} />
          </Animated.View>
        ) : null}
        {Icon && withCheckmark && selected ? null : renderIconConditionally()}
        {label ? (
          <Animated.Text layout={LinearTransition} style={[labelLarge, animatedLabelStyle, labelStyle]}>
            {label}
          </Animated.Text>
        ) : null}
      </Pressable>
    );
  }
);
