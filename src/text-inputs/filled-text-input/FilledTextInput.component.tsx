import React, {forwardRef, useRef} from 'react';
import {Text, View, TextInput, TouchableWithoutFeedback} from 'react-native';
import Animated, {useAnimatedStyle, interpolateColor, interpolate} from 'react-native-reanimated';

import {ErrorIcon} from '../../icons';
import {styles} from './filled-text-input.styles';
import {type IconProps} from '../../icons/icon-props';
import type {TextInputProps} from '../text-input.type';
import {useTextInputColors} from '../use-text-input-colors.hook';
import {useTextInputFocus} from '../use-text-input-focus-anim.hook';
import {useTypography} from '../../typography/useTypography.component';

const UNFOCUSED_LABEL_TOP_PLACEMENT = 8;
const DEFAULT_LABEL_SMALL_FONT_SIZE = 12;
const DEFAULT_LABEL_LARGE_FONT_SIZE = 16;
const ACTIVE_INDICATOR_FOCUSED_HEIGHT = 3;
const ACTIVE_INDICATOR_UNFOCUSED_HEIGHT = 1;

export const FilledTextInput = forwardRef(
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
      outerContainerStyle,
      innerContainerStyle,
      supportingTextStyle,
      activeIndicatorStyle,

      onFocus,
      onBlur,
      onOuterContainerLayout,
      ...props
    }: TextInputProps<T>,
    ref: React.Ref<TextInput>
  ) => {
    const {bodyLarge, bodySmall} = useTypography();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRef = (ref as React.MutableRefObject<TextInput>) || useRef<TextInput>(null);
    const {
      valueColor,
      containerColor,
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

    const [smallLabelFontSize, largeLabelFontSize] = [
      bodySmall.fontSize ?? DEFAULT_LABEL_SMALL_FONT_SIZE,
      bodyLarge.fontSize ?? DEFAULT_LABEL_LARGE_FONT_SIZE,
    ];
    const [unfocusedLabelFontSize, unfocusedLabelTopPlacement] = placeholder
      ? [smallLabelFontSize, 0]
      : [largeLabelFontSize, UNFOCUSED_LABEL_TOP_PLACEMENT];

    const labelAnimatedStyles = useAnimatedStyle(
      () => ({
        top: interpolate(focusAnim.value, focusAnimRange, [unfocusedLabelTopPlacement, 0]),
        color: interpolateColor(focusAnim.value, focusAnimRange, [labelUnfocusedColor, labelFocusedColor] as string[]),
        fontSize: interpolate(focusAnim.value, focusAnimRange, [unfocusedLabelFontSize, smallLabelFontSize]),
      }),
      [labelUnfocusedColor, labelFocusedColor, unfocusedLabelTopPlacement, unfocusedLabelFontSize, smallLabelFontSize]
    );

    const activeIndicatorAnimatedStyles = useAnimatedStyle(
      () => ({
        backgroundColor: interpolateColor(focusAnim.value, focusAnimRange, [activeIndicatorUnfocusedColor, activeIndicatorFocusedColor] as string[]),
        height: interpolate(focusAnim.value, focusAnimRange, [ACTIVE_INDICATOR_UNFOCUSED_HEIGHT, ACTIVE_INDICATOR_FOCUSED_HEIGHT]),
      }),
      [activeIndicatorUnfocusedColor, activeIndicatorFocusedColor]
    );

    return (
      <View style={outerContainerStyle} onLayout={onOuterContainerLayout}>
        <TouchableWithoutFeedback onPress={focusInput}>
          <Animated.View style={[styles.container, {backgroundColor: containerColor}, innerContainerStyle]}>
            {leadingComponent}
            {LeadingIcon ? <LeadingIcon color={leadingIconColor} style={styles.leadingIcon} {...leadingIconProps} /> : null}
            <View style={[styles.inputWithLabelContainer]}>
              <Animated.Text style={[styles.label, bodyLarge, labelAnimatedStyles, labelStyle]}>{label}</Animated.Text>
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
            {TrailingIcon ? <TrailingIcon color={trailingIconColor} style={styles.trailingIcon} {...trailingIconProps} /> : null}
            {trailingComponent}
            <Animated.View style={[styles.activeIndicator, activeIndicatorAnimatedStyles, activeIndicatorStyle]} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {suportingText || errorText ? (
          <Text style={[bodySmall, styles.supportingText, {color: supportingTextColor}, supportingTextStyle]}>{errorText ?? suportingText}</Text>
        ) : null}
      </View>
    );
  }
);
