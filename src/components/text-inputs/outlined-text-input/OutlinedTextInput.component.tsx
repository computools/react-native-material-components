import React, {forwardRef, useCallback, useRef, useState} from 'react';
import Animated, {useAnimatedStyle, interpolateColor, interpolate} from 'react-native-reanimated';
import {Text, View, TextInput, TouchableWithoutFeedback, type StyleProp, type ViewStyle, type LayoutChangeEvent} from 'react-native';

import {ErrorIcon} from '../../icons';
import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {type TextInputProps} from '../text-input.types';
import {useTextInputColors} from '../use-text-input-colors.hook';
import {useTextInputFocus} from '../use-text-input-focus-anim.hook';
import {useTypography} from '../../../typography/useTypography.component';
import {OUTLINED_TEXT_INPUT_CONTAINER_PADDING_VERTICAL, OUTLINED_TEXT_INPUT_CONTAINER_PADDING_HORIZONTAL, styles} from './outlined-text-input.styles';

const BORDER_FOCUSED_WIDTH = 3;
const BORDER_UNFOCUSED_WIDTH = 1;
const UNFOCUSED_LABEL_TOP_PLACEMENT = 8;
const DEFAULT_LABEL_SMALL_FONT_SIZE = 12;
const DEFAULT_LABEL_LARGE_FONT_SIZE = 16;
const DEFAULT_LABEL_SMALL_LINE_HEIGHT = 15;
const FOCUSED_LABEL_SLOT_PADDING_HORIZONTAL = 4;

export interface OutlinedTextInputProps<T> extends TextInputProps<T> {
  labelSlotStyle?: StyleProp<ViewStyle>;
}

export const OutlinedTextInput = forwardRef(
  <T extends IconProps>(
    {
      label,
      placeholder,

      errorText,
      suportingText,
      disabled = false,

      leadingIcon,
      trailingIcon,
      leadingIconProps = {} as T,
      trailingIconProps = {} as T,

      leadingComponent,
      trailingComponent,

      style,
      labelStyle,
      labelSlotStyle,
      outerContainerStyle,
      innerContainerStyle,
      supportingTextStyle,

      onFocus,
      onBlur,
      onOuterContainerLayout,
      ...props
    }: OutlinedTextInputProps<T>,
    ref: React.Ref<TextInput>
  ) => {
    const [labelWidth, setLabeWidth] = useState(0);
    const [labelDistanceToContainerStart, setLabelDistanceToContainerStart] = useState(0);

    const {surfaceContainer} = useTheme();
    const {bodyLarge, bodySmall} = useTypography();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRef = (ref as React.MutableRefObject<TextInput>) || useRef<TextInput>(null);
    const {
      valueColor,
      selectionColor,
      placeholderColor,
      labelFocusedColor,
      trailingIconColor,
      leadingIconColor,
      labelUnfocusedColor,
      supportingTextColor,
      activeIndicatorFocusedColor,
      activeIndicatorUnfocusedColor,
    } = useTextInputColors({
      disabled,
      isError: (errorText?.length ?? 0) > 0,
    });
    const {focusAnim, focusAnimRange, focusInput, onInputBlur, onInputFocus} = useTextInputFocus({inputRef, onBlur, onFocus});

    const LeadingIcon = leadingIcon;
    const TrailingIcon = errorText ? ErrorIcon : trailingIcon;

    const [smallLabelFontSize, largeLabelFontSize, smallLabelHeight] = [
      bodySmall.fontSize ?? DEFAULT_LABEL_SMALL_FONT_SIZE,
      bodyLarge.fontSize ?? DEFAULT_LABEL_LARGE_FONT_SIZE,
      bodySmall.lineHeight ?? DEFAULT_LABEL_SMALL_LINE_HEIGHT,
    ];

    const labelFontSizeCoeff = placeholder ? 1 : smallLabelFontSize / largeLabelFontSize;
    const focusedLabelSlotWidth = labelWidth * labelFontSizeCoeff + FOCUSED_LABEL_SLOT_PADDING_HORIZONTAL * 2;
    const focusedLabelTop = -(OUTLINED_TEXT_INPUT_CONTAINER_PADDING_VERTICAL + smallLabelHeight / 2 + BORDER_FOCUSED_WIDTH / 2);

    const focusedLabelStart = -(labelDistanceToContainerStart - OUTLINED_TEXT_INPUT_CONTAINER_PADDING_HORIZONTAL - BORDER_UNFOCUSED_WIDTH);
    const focusedLabelSlotStart = OUTLINED_TEXT_INPUT_CONTAINER_PADDING_HORIZONTAL - FOCUSED_LABEL_SLOT_PADDING_HORIZONTAL;
    const unfocusedLabelSlotStartWithoutPlaceholder = OUTLINED_TEXT_INPUT_CONTAINER_PADDING_HORIZONTAL + focusedLabelSlotWidth / 2;

    const [unfocusedLabelFontSize, unfocusedLabelTop, unfocusedLabelStart, unfocusedLabelSlotWidth, unfocusedLabelSlotStart] = placeholder
      ? [smallLabelFontSize, focusedLabelTop, focusedLabelStart, focusedLabelSlotWidth, focusedLabelSlotStart]
      : [largeLabelFontSize, UNFOCUSED_LABEL_TOP_PLACEMENT, 0, 0, unfocusedLabelSlotStartWithoutPlaceholder];

    const labelSlotHeight = BORDER_FOCUSED_WIDTH * 4;
    const labelSlotTop = -(BORDER_FOCUSED_WIDTH + labelSlotHeight / 2);

    const labelAnimatedStyles = useAnimatedStyle(() => ({
      top: interpolate(focusAnim.value, focusAnimRange, [unfocusedLabelTop, focusedLabelTop]),
      start: interpolate(focusAnim.value, focusAnimRange, [unfocusedLabelStart, focusedLabelStart]),
      color: interpolateColor(focusAnim.value, focusAnimRange, [labelUnfocusedColor, labelFocusedColor] as string[]),
      fontSize: interpolate(focusAnim.value, focusAnimRange, [unfocusedLabelFontSize, smallLabelFontSize]),
    }));

    const focusedLabelSlot = useAnimatedStyle(() => ({
      top: labelSlotTop,
      start: interpolate(focusAnim.value, focusAnimRange, [unfocusedLabelSlotStart, focusedLabelSlotStart]),
      width: interpolate(focusAnim.value, focusAnimRange, [unfocusedLabelSlotWidth, focusedLabelSlotWidth]),
      height: labelSlotHeight,
    }));

    const containerAnimatedStyles = useAnimatedStyle(() => ({
      borderColor: interpolateColor(focusAnim.value, focusAnimRange, [activeIndicatorUnfocusedColor, activeIndicatorFocusedColor] as string[]),
      borderWidth: interpolate(focusAnim.value, focusAnimRange, [BORDER_UNFOCUSED_WIDTH, BORDER_FOCUSED_WIDTH]),
    }));

    const getLabelWidth = useCallback(
      (e: LayoutChangeEvent) => {
        if (!labelWidth) {
          setLabeWidth(e.nativeEvent.layout.width);
        }
      },
      [labelWidth]
    );

    const getLabelDistanceToContainerStart = useCallback(
      (e: LayoutChangeEvent) => {
        if (!labelDistanceToContainerStart) {
          setLabelDistanceToContainerStart(e.nativeEvent.layout.x);
        }
      },
      [labelDistanceToContainerStart]
    );

    return (
      <View style={outerContainerStyle} onLayout={onOuterContainerLayout}>
        <TouchableWithoutFeedback onPress={focusInput}>
          <Animated.View style={[styles.container, containerAnimatedStyles, innerContainerStyle]}>
            {leadingComponent}
            {LeadingIcon ? <LeadingIcon color={leadingIconColor} style={styles.leadingIcon} {...leadingIconProps} /> : null}
            <Animated.View style={[styles.labelSlot, {backgroundColor: surfaceContainer.backgroundLow}, focusedLabelSlot, labelSlotStyle]} />
            <View onLayout={getLabelDistanceToContainerStart} style={[styles.inputWithLabelContainer]}>
              <Animated.Text onLayout={getLabelWidth} style={[styles.label, bodyLarge, labelAnimatedStyles, labelStyle]}>
                {label}
              </Animated.Text>
              <TextInput
                ref={inputRef}
                onBlur={onInputBlur}
                onFocus={onInputFocus}
                editable={!disabled}
                placeholder={placeholder}
                selectionColor={selectionColor}
                placeholderTextColor={placeholderColor}
                style={[styles.input, bodyLarge, {color: valueColor}, style]}
                {...props}
              />
            </View>
            {trailingComponent}
            {TrailingIcon ? <TrailingIcon color={trailingIconColor} style={styles.trailingIcon} {...trailingIconProps} /> : null}
          </Animated.View>
        </TouchableWithoutFeedback>
        {suportingText || errorText ? (
          <Text style={[bodySmall, styles.supportingText, {color: supportingTextColor}, supportingTextStyle]}>{errorText ?? suportingText}</Text>
        ) : null}
      </View>
    );
  }
);
