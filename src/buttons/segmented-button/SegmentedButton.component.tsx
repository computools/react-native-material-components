import React, {useCallback, useMemo, type ReactElement} from 'react';
import {View, type ViewProps, type ColorValue, type StyleProp, type TextStyle} from 'react-native';

import {styles} from './segmented-button.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {convertToRGBA} from '../../utils/convert-to-rgba';
import {ButtonSegment as ButtonSegmentComponent} from './button-segment/ButtonSegment.component';

export interface ButtonSegment<T, U> {
  value: T;

  label?: string;
  Icon?: React.FC<U>;
}

export interface SegmentedButtonProps<T, U> extends ViewProps {
  segments: ButtonSegment<T, U>[];
  selected: T[];

  disabled?: boolean;
  multiSelectionEnabled?: boolean;
  withCheckmark?: boolean;
  iconSize?: number;
  iconColor?: ColorValue;
  rippleColor?: ColorValue;
  labelStyle?: StyleProp<TextStyle>;

  onSegmentPress: (value: T[] | ((currValues: T[]) => T[])) => void;
}

export const SegmentedButton: <T extends any, U extends IconProps>(props: SegmentedButtonProps<T, U>) => ReactElement = ({
  segments,
  selected,
  disabled = false,
  multiSelectionEnabled = false,
  onSegmentPress,
  style,
  withCheckmark,
  labelStyle,
  iconSize,
  iconColor,
  rippleColor,
  ...props
}) => {
  const {outline} = useTheme();

  const borderColor = useMemo(() => (disabled ? convertToRGBA(outline as string, 0.12) : outline), [disabled]);

  const renderButtonSegment = useCallback(
    (segment, index) => (
      <ButtonSegmentComponent
        key={segment.value}
        style={{borderLeftWidth: Number(Boolean(index)), borderLeftColor: borderColor}}
        selected={selected.includes(segment.value)}
        onSegmentPress={onSegmentPress}
        disabled={disabled}
        multiSelectionEnabled={multiSelectionEnabled}
        withCheckmark={withCheckmark}
        labelStyle={labelStyle}
        iconSize={iconSize}
        iconColor={iconColor}
        rippleColor={rippleColor}
        {...segment}
      />
    ),
    [selected, withCheckmark, disabled, borderColor, labelStyle, iconColor, iconSize, rippleColor, multiSelectionEnabled, onSegmentPress]
  );

  return (
    <View style={[styles.container, {borderColor}, style]} {...props}>
      {segments.map(renderButtonSegment)}
    </View>
  );
};
