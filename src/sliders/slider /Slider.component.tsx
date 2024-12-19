import {View} from 'react-native';
import React, {useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {type LayoutChangeEvent, type ViewProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';
import {interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

import {styles} from './slider.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {SliderTrack} from './slider-track/SliderTrack.component';
import {SliderIndicator} from './slider-indicator/SliderIndicator.component';
import {SliderTrackPoint} from './slider-track-point/SliderTrackPoint.component';

export interface SliderProps extends ViewProps {
  max: number;
  min: number;

  value?: number;
  step?: number;
  centered?: boolean;

  thumbStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  trackPointStyle?: StyleProp<ViewStyle>;
  trackPointsStyle?: StyleProp<ViewStyle>;
  filledTrackStyle?: StyleProp<ViewStyle>;
  remainingTrackStyle?: StyleProp<ViewStyle>;
  valueContainerStyle?: StyleProp<ViewStyle>;

  onChangeValue?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  max,
  min,

  step,
  value = 0,
  centered = false,

  thumbStyle,
  valueStyle,
  indicatorStyle,
  trackPointStyle,
  trackPointsStyle,
  filledTrackStyle,
  valueContainerStyle,
  remainingTrackStyle,

  onChangeValue,
  onLayout,
  style,
  ...props
}) => {
  const [sliderWidth, setSliderWith] = useState(0);
  const [selectedValue, setSelectedValue] = useState(value);

  const {primary, secondaryContainer} = useTheme();

  const sliding = useSharedValue(0);
  const thumbTranslationX = useSharedValue(0);
  const thumbTranslationXContext = useSharedValue(0);

  const filledTrackAnimatedStyle = useAnimatedStyle(() => ({flex: interpolate(thumbTranslationX.value, [0, sliderWidth], [0, 1])}), [sliderWidth]);
  const remainingTrackAnimatedStyle = useAnimatedStyle(() => ({flex: interpolate(thumbTranslationX.value, [0, sliderWidth], [1, 0])}), [sliderWidth]);

  const getDiscreteTrackPoints = (discreteStep: number) => {
    const totalPoints = Math.ceil((max - min) / discreteStep) + 1;

    return Array.from({length: totalPoints}, (_, index) => Math.min(min + index * discreteStep, max));
  };

  const trackPoints = step ? getDiscreteTrackPoints(step) : centered ? [min, (min + max) / 2, max] : [max];

  const calcAndUpdateValueBasedOnThumbTranslationX = (translationX: number, onChange: (value: number) => void) => {
    const currrentValue = Math.round(interpolate(translationX, [0, sliderWidth], [min, max]));

    onChange(currrentValue);
  };

  useAnimatedReaction(
    () => thumbTranslationX.value,
    (currentThumbValue) => {
      runOnJS(calcAndUpdateValueBasedOnThumbTranslationX)(currentThumbValue, setSelectedValue);
    }
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      sliding.value = withTiming(1);
    })
    .onUpdate((e) => {
      thumbTranslationX.value = Math.max(0, Math.min(Math.round(thumbTranslationXContext.value + e.translationX), sliderWidth));

      runOnJS(calcAndUpdateValueBasedOnThumbTranslationX)(thumbTranslationX.value, setSelectedValue);
    })
    .onEnd(() => {
      thumbTranslationXContext.value = thumbTranslationX.value;
      sliding.value = withTiming(0);

      if (onChangeValue) {
        runOnJS(calcAndUpdateValueBasedOnThumbTranslationX)(thumbTranslationX.value, onChangeValue);
      }
    });

  const handleLayoutChange = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;

    initializeThumbPosition(width);
    setSliderWith(width);

    if (onLayout) {
      onLayout(e);
    }
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

  const renderTrackPoint = (pointValue: number) => (
    <SliderTrackPoint
      key={pointValue}
      value={pointValue}
      onPress={slideToTrackPoint}
      style={[{backgroundColor: selectedValue > pointValue ? secondaryContainer.background : secondaryContainer.text}, trackPointStyle]}
    />
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.container, style]} onLayout={handleLayoutChange} {...props}>
        <SliderTrack style={[{backgroundColor: primary.background}, styles.filledTrack, filledTrackAnimatedStyle, filledTrackStyle]} />
        <SliderIndicator
          value={selectedValue}
          sliding={sliding}
          style={[styles.thumb, indicatorStyle]}
          thumbStyle={thumbStyle}
          valueStyle={valueStyle}
          valueContainerStyle={valueContainerStyle}
        />
        <SliderTrack
          style={[{backgroundColor: secondaryContainer.background}, styles.remainingTrack, remainingTrackAnimatedStyle, remainingTrackStyle]}
        />
        <View style={[styles.trackPoints, {justifyContent: trackPoints.length > 1 ? 'space-between' : 'flex-end'}, trackPointsStyle]}>
          {trackPoints.map(renderTrackPoint)}
        </View>
      </View>
    </GestureDetector>
  );
};
