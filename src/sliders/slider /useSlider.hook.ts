import {useState} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {interpolate, runOnJS, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

import {type SliderConfig} from './slider-config.type';

export const useSlider = ({max, min, step}: SliderConfig, value: number, onChangeValue?: (value: number) => void) => {
  const [sliderWidth, setSliderWith] = useState(0);

  const sliding = useSharedValue(0);
  const selectedValue = useSharedValue(value);
  const thumbTranslationX = useSharedValue(0);
  const thumbTranslationXContext = useSharedValue(0);

  const filledTrackAnimatedStyle = useAnimatedStyle(() => ({flex: interpolate(thumbTranslationX.value, [0, sliderWidth], [0, 1])}), [sliderWidth]);
  const remainingTrackAnimatedStyle = useAnimatedStyle(() => ({flex: interpolate(thumbTranslationX.value, [0, sliderWidth], [1, 0])}), [sliderWidth]);

  const calcValueBasedOnThumbTranslationX = (translationX: number) => {
    'worklet';

    const valueBaseOnThumbTranslateX = Math.round(interpolate(translationX, [0, sliderWidth], [min, max]));
    const roundedValue = step ? Math.round(valueBaseOnThumbTranslateX / step) * step : valueBaseOnThumbTranslateX;

    selectedValue.value = roundedValue;

    return roundedValue;
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      sliding.value = withTiming(1);
    })
    .onUpdate((e) => {
      if (step) {
        const stepSize = (sliderWidth / (max - min)) * step;
        const currentTranslationX = Math.max(0, Math.min(Math.round(thumbTranslationXContext.value + e.translationX), sliderWidth));
        const stepSnap = Math.round(currentTranslationX / stepSize) * stepSize;

        thumbTranslationX.value = stepSnap;
      } else {
        thumbTranslationX.value = Math.max(0, Math.min(Math.round(thumbTranslationXContext.value + e.translationX), sliderWidth));
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
    initializeThumbPosition(width);
    setSliderWith(width);
  };

  const initializeThumbPosition = (width: number) => {
    const initialTthumbTranslationX = ((value - min) / (max - min)) * width;

    thumbTranslationX.value = initialTthumbTranslationX;
    thumbTranslationXContext.value = initialTthumbTranslationX;
  };

  const slideToTrackPoint = (pointValue: number) => {
    const thumbPointValueTranslationX = ((pointValue - min) / (max - min)) * sliderWidth;

    sliding.value = withTiming(1);
    thumbTranslationX.value = withSpring(thumbPointValueTranslationX, {damping: 20}, () => {
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
