import {useEffect, useState} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {interpolate, runOnJS, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

import {type SliderConfig} from '../slider-config.type';
import {normalize} from '../worklets/normalize.worklet';
import {calcTranslationXBasedOnValue} from '../worklets/calc-translationX-based-on-value.worklet';

export const useSlider = ({max, min, step, damping}: SliderConfig, value: number, onChangeValue?: (value: number) => void) => {
  const [sliderWidth, setSliderWith] = useState(0);

  const sliding = useSharedValue(0);
  const selectedValue = useSharedValue(value);
  const thumbTranslationX = useSharedValue(0);
  const thumbTranslationXContext = useSharedValue(0);

  const filledTrackAnimatedStyle = useAnimatedStyle(() => ({flex: interpolate(thumbTranslationX.value, [0, sliderWidth], [0, 1])}), [sliderWidth]);
  const remainingTrackAnimatedStyle = useAnimatedStyle(() => ({flex: interpolate(thumbTranslationX.value, [0, sliderWidth], [1, 0])}), [sliderWidth]);

  useEffect(() => {
    adjustThumbPosition(sliderWidth);
  }, [value, sliderWidth]);

  const calcValueBasedOnThumbTranslationX = (translationX: number) => {
    'worklet';

    const valueBaseOnThumbTranslateX = Math.round(interpolate(translationX, [0, sliderWidth], [min, max]));
    const normalizedValue = normalize(valueBaseOnThumbTranslateX, step);

    selectedValue.value = normalizedValue;

    return normalizedValue;
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      sliding.value = withTiming(1);
    })
    .onUpdate((e) => {
      const currentTranslationX = Math.max(0, Math.min(Math.round(thumbTranslationXContext.value + e.translationX), sliderWidth));

      if (step) {
        const stepSize = (sliderWidth / (max - min)) * step;
        const stepSnap = normalize(currentTranslationX, stepSize);

        thumbTranslationX.value = stepSnap;
      } else {
        thumbTranslationX.value = currentTranslationX;
      }
    })
    .onEnd(() => {
      thumbTranslationXContext.value = thumbTranslationX.value;
      sliding.value = withTiming(0);

      if (onChangeValue) {
        const valueBasedOnPos = calcValueBasedOnThumbTranslationX(thumbTranslationX.value);
        runOnJS(onChangeValue)(valueBasedOnPos);
      }
    });

  const setUpSliderLayout = (width: number) => {
    adjustThumbPosition(width);
    setSliderWith(width);
  };

  const adjustThumbPosition = (width: number) => {
    const initialTthumbTranslationX = calcTranslationXBasedOnValue({min, max}, normalize(value, step), width);

    thumbTranslationX.value = withSpring(initialTthumbTranslationX, {damping});
    thumbTranslationXContext.value = initialTthumbTranslationX;
  };

  const slideToTrackPoint = (pointValue: number) => {
    const thumbPointValueTranslationX = calcTranslationXBasedOnValue({min, max}, pointValue, sliderWidth);

    sliding.value = withTiming(1);
    thumbTranslationX.value = withSpring(thumbPointValueTranslationX, {damping}, () => {
      sliding.value = withTiming(0);
      thumbTranslationXContext.value = thumbPointValueTranslationX;

      if (onChangeValue) {
        runOnJS(onChangeValue)(pointValue);
      }
    });
  };

  const animValueProps = useAnimatedProps(() => ({
    text: `${calcValueBasedOnThumbTranslationX(thumbTranslationX.value)}`,
  }));

  return {
    gesture,
    sliding,
    animValueProps,
    selectedValue,
    filledTrackAnimatedStyle,
    remainingTrackAnimatedStyle,

    slideToTrackPoint,
    setUpSliderLayout,
  };
};
