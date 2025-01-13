import {useEffect, useState} from 'react';
import {type LayoutChangeEvent} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import {
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import {type SliderConfig} from '../slider-config.type';
import {normalize} from '../worklets/normalize.worklet';
import {validateSliderRange} from './validate-slider-range';
import {calcTranslationXBasedOnValue} from '../worklets/calc-translationX-based-on-value.worklet';

enum ThumbType {
  MIN = 'MIN',
  MAX = 'MAX',
}

export const useRangeSlider = ({max, min, step, damping}: SliderConfig, range: number[], onChangeRange?: (range: number[]) => void) => {
  const [sliderLayout, setSliderLayout] = useState({width: 0, height: 0, x: 0, y: 0});

  const [minValue, maxValue] = [range[0] ?? 0, range[1] ?? 0];

  const thumbMinSliding = useSharedValue(0);
  const thumbMaxSliding = useSharedValue(0);
  const thumbMinTranslationX = useSharedValue(0);
  const thumbMaxTranslationX = useSharedValue(0);
  const thumbsTranslationXContext = useSharedValue({min: 0, max: 0});
  const selectedRange = useSharedValue([minValue, maxValue]);

  useEffect(() => {
    validateSliderRange(range);
    adjustThumbsPosition(sliderLayout.width);
  }, [range, sliderLayout]);

  const filledTrackAnimatedStyle = useAnimatedStyle(() => {
    const remainingTrackFlex = interpolate(thumbMinTranslationX.value, [0, sliderLayout.width], [0, 1]);
    const remainingTrackAfterFlex = interpolate(thumbMaxTranslationX.value, [0, sliderLayout.width], [0, 1]);

    return {flex: Math.abs(remainingTrackFlex - remainingTrackAfterFlex)};
  }, [sliderLayout]);

  const remainingTrackBeforeAnimatedStyle = useAnimatedStyle(
    () => ({flex: interpolate(thumbMinTranslationX.value, [0, sliderLayout.width], [0, 1])}),
    [sliderLayout]
  );

  const remainingTrackAfterAnimatedStyle = useAnimatedStyle(
    () => ({flex: interpolate(thumbMaxTranslationX.value, [0, sliderLayout.width], [1, 0])}),
    [sliderLayout]
  );

  const calcValueBasedOnThumbTranslationX = (translationX: number, thumbType: ThumbType) => {
    'worklet';

    const value = Math.round(interpolate(translationX, [0, sliderLayout.width], [min, max]));
    const normalizedValue = normalize(value, step);

    selectedRange.value =
      thumbType === ThumbType.MIN ? [normalizedValue, selectedRange.value[1] ?? 0] : [selectedRange.value[0] ?? 0, normalizedValue];

    return normalizedValue;
  };

  const updateTranslationX = (thumbTranslationX: SharedValue<number>, translationX: number) => {
    'worklet';

    if (step) {
      const stepSize = (sliderLayout.width / (max - min)) * step;
      const stepSnap = normalize(translationX, stepSize);

      thumbTranslationX.value = stepSnap;
    } else {
      thumbTranslationX.value = translationX;
    }
  };

  const gesture = Gesture.Pan()
    .onStart((e) => {
      const touchX = e.x - sliderLayout.x;

      const distanceToMinThumb = Math.abs(touchX - thumbMinTranslationX.value);
      const distanceToMaxThumb = Math.abs(touchX - thumbMaxTranslationX.value);
      const activeThumb = touchX < thumbMaxTranslationX.value && distanceToMinThumb <= distanceToMaxThumb ? thumbMinSliding : thumbMaxSliding;

      activeThumb.value = withTiming(1);
    })
    .onUpdate((e) => {
      if (thumbMinSliding.value) {
        const currentMinTranslationX = Math.max(0, Math.min(thumbMaxTranslationX.value, e.translationX + thumbsTranslationXContext.value.min));

        updateTranslationX(thumbMinTranslationX, currentMinTranslationX);
      } else if (thumbMaxSliding.value) {
        const currentMaxTranslationX = Math.min(
          sliderLayout.width,
          Math.max(thumbMinTranslationX.value, e.translationX + thumbsTranslationXContext.value.max)
        );

        updateTranslationX(thumbMaxTranslationX, currentMaxTranslationX);
      }
    })
    .onEnd(() => {
      thumbMinSliding.value = withTiming(0);
      thumbMaxSliding.value = withTiming(0);
      thumbsTranslationXContext.value = {min: thumbMinTranslationX.value, max: thumbMaxTranslationX.value};

      if (onChangeRange) {
        runOnJS(onChangeRange)(selectedRange.value);
      }
    });

  const setUpSliderLayout = (e: LayoutChangeEvent) => {
    const layout = e.nativeEvent.layout;

    adjustThumbsPosition(layout.width);
    setSliderLayout(layout);
  };

  const adjustThumbsPosition = (width: number) => {
    const initialMinTthumbTranslationX = calcTranslationXBasedOnValue({min, max}, normalize(minValue, step), width);
    const initiaMaxTthumbTranslationX = calcTranslationXBasedOnValue({min, max}, normalize(maxValue, step), width);

    thumbMinTranslationX.value = withSpring(initialMinTthumbTranslationX, {damping});
    thumbMaxTranslationX.value = withSpring(initiaMaxTthumbTranslationX, {damping});
    thumbsTranslationXContext.value = {min: initialMinTthumbTranslationX, max: initiaMaxTthumbTranslationX};
  };

  const slideToTrackPoint = (pointValue: number) => {
    if (typeof selectedRange.value[0] !== 'number' || typeof selectedRange.value[1] !== 'number') {
      return;
    }

    const diffFromMinThumb = Math.abs(pointValue - selectedRange.value[0]);
    const diffFromMaxThumb = Math.abs(pointValue - selectedRange.value[1]);

    let [activeThumbSliding, activeThumbTranslationX] = [thumbMaxSliding, thumbMaxTranslationX];

    if (diffFromMinThumb === diffFromMaxThumb) {
      [activeThumbSliding, activeThumbTranslationX] =
        pointValue < selectedRange.value[0] ? [thumbMinSliding, thumbMinTranslationX] : [thumbMaxSliding, thumbMaxTranslationX];
    } else if (diffFromMinThumb < diffFromMaxThumb) {
      [activeThumbSliding, activeThumbTranslationX] = [thumbMinSliding, thumbMinTranslationX];
    }

    const thumbPointValueTranslationX = calcTranslationXBasedOnValue({min, max}, pointValue, sliderLayout.width);

    activeThumbSliding.value = withTiming(1);
    activeThumbTranslationX.value = withSpring(thumbPointValueTranslationX, {damping}, () => {
      activeThumbSliding.value = withTiming(0);
      thumbsTranslationXContext.value = {min: thumbMinTranslationX.value, max: thumbMaxTranslationX.value};

      if (onChangeRange) {
        runOnJS(onChangeRange)(selectedRange.value);
      }
    });
  };

  const animMinValueProps = useAnimatedProps(() => ({
    text: `${calcValueBasedOnThumbTranslationX(thumbMinTranslationX.value, ThumbType.MIN)}`,
  }));

  const animMaxValueProps = useAnimatedProps(() => ({
    text: `${calcValueBasedOnThumbTranslationX(thumbMaxTranslationX.value, ThumbType.MAX)}`,
  }));

  return {
    gesture,
    selectedRange,
    thumbMinSliding,
    thumbMaxSliding,
    animMinValueProps,
    animMaxValueProps,
    filledTrackAnimatedStyle,
    remainingTrackAfterAnimatedStyle,
    remainingTrackBeforeAnimatedStyle,

    setUpSliderLayout,
    slideToTrackPoint,
  };
};
