import React from 'react';
import {View} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import {type LayoutChangeEvent, type ViewProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';

import {styles} from './range-slider.styles';
import {useRangeSlider} from './useRangeSlider.hook';
import {useSliderColors} from '../use-slider-colors.hook';
import {SliderTrack} from '../ui/slider-track/SliderTrack.component';
import {useRangeSliderTrackPoints} from './useRangeSliderTrackPoints.hook';
import {SliderIndicator} from '../ui/slider-indicator/SliderIndicator.component';
import {SliderTrackPoint} from '../ui/slider-track-point/SliderTrackPoint.component';

export interface RangeSliderProps extends ViewProps {
  max: number;
  min: number;

  range?: number[];
  step?: number;
  damping?: number;
  centered?: boolean;
  disabled?: boolean;

  valueHeight?: number;
  thumbWidthActive?: number;
  thumbWidthInactive?: number;

  thumbStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  trackPointStyle?: StyleProp<ViewStyle>;
  trackPointsStyle?: StyleProp<ViewStyle>;
  filledTrackStyle?: StyleProp<ViewStyle>;
  remainingTrackStyle?: StyleProp<ViewStyle>;

  onChangeRange?: (range: number[]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  max,
  min,

  step,
  range = [0, 0],
  damping = 20,
  centered = false,
  disabled = false,

  thumbStyle,
  valueStyle,
  indicatorStyle,
  trackPointStyle,
  trackPointsStyle,
  filledTrackStyle,
  remainingTrackStyle,

  valueHeight,
  thumbWidthActive,
  thumbWidthInactive,

  onChangeRange,
  onLayout,
  style,
  ...props
}) => {
  const {filledTrackColor, remainingTrackColor} = useSliderColors(disabled, centered);

  const trackPoints = useRangeSliderTrackPoints({max, min, step, centered});
  const {
    gesture,
    selectedRange,
    thumbMinSliding,
    thumbMaxSliding,
    animMinValueProps,
    animMaxValueProps,
    filledTrackAnimatedStyle,
    remainingTrackAfterAnimatedStyle,
    remainingTrackBeforeAnimatedStyle,
    slideToTrackPoint,
    setUpSliderLayout,
  } = useRangeSlider({max, min, centered, step, damping}, range, onChangeRange);

  const handleLayoutChange = (e: LayoutChangeEvent) => {
    setUpSliderLayout(e);

    if (onLayout) {
      onLayout(e);
    }
  };

  const renderTrackPoint = (pointValue: number) => (
    <SliderTrackPoint
      key={pointValue}
      value={pointValue}
      disabled={disabled}
      selectedValue={selectedRange}
      onPress={slideToTrackPoint}
      style={trackPointStyle}
    />
  );

  return (
    <GestureDetector gesture={gesture.enabled(!disabled)}>
      <View style={[styles.container, style]} onLayout={handleLayoutChange} {...props}>
        <SliderTrack
          style={[{backgroundColor: remainingTrackColor}, styles.remainingBeforeTrack, remainingTrackBeforeAnimatedStyle, filledTrackStyle]}
        />
        <SliderIndicator
          animValueProps={animMinValueProps}
          sliding={thumbMinSliding}
          disabled={disabled}
          style={[styles.thumb, indicatorStyle]}
          thumbStyle={thumbStyle}
          valueStyle={valueStyle}
          valueHeight={valueHeight}
          thumbWidthActive={thumbWidthActive}
          thumbWidthInactive={thumbWidthInactive}
        />
        <SliderTrack style={[{backgroundColor: filledTrackColor}, styles.filledTrack, filledTrackAnimatedStyle, filledTrackStyle]} />
        <SliderIndicator
          animValueProps={animMaxValueProps}
          sliding={thumbMaxSliding}
          disabled={disabled}
          style={[styles.thumb, indicatorStyle]}
          thumbStyle={thumbStyle}
          valueStyle={valueStyle}
          valueHeight={valueHeight}
          thumbWidthActive={thumbWidthActive}
          thumbWidthInactive={thumbWidthInactive}
        />
        <SliderTrack
          style={[{backgroundColor: remainingTrackColor}, styles.remainingAfterTrack, remainingTrackAfterAnimatedStyle, remainingTrackStyle]}
        />
        <View style={[styles.trackPoints, trackPointsStyle]}>{trackPoints.map(renderTrackPoint)}</View>
      </View>
    </GestureDetector>
  );
};
