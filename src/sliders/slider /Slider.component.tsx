import React from 'react';
import {View} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import {type LayoutChangeEvent, type ViewProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';

import {styles} from './slider.styles';
import {useSlider} from './useSlider.hook';
import {useTheme} from '../../theme/useTheme.hook';
import {useSliderTrackPoints} from './useSliderTrackPoints.hook';
import {SliderTrack} from '../ui/slider-track/SliderTrack.component';
import {SliderIndicator} from '../ui/slider-indicator/SliderIndicator.component';
import {SliderTrackPoint} from '../ui/slider-track-point/SliderTrackPoint.component';

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

  throttleDelay?: number;

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
  remainingTrackStyle,

  onChangeValue,
  onLayout,
  style,
  ...props
}) => {
  const {primary, secondaryContainer} = useTheme();

  const trackPoints = useSliderTrackPoints({max, min, step, centered});
  const {
    gesture,
    sliding,
    selectedValue,
    animValueProps,
    filledTrackAnimatedStyle,
    remainingTrackAnimatedStyle,
    slideToTrackPoint,
    setUpSliderLayout,
  } = useSlider({max, min, step}, value, onChangeValue);

  const trackPointsJustifyContent = trackPoints.length > 1 ? 'space-between' : 'flex-end';

  const handleLayoutChange = (e: LayoutChangeEvent) => {
    setUpSliderLayout(e.nativeEvent.layout.width);

    if (onLayout) {
      onLayout(e);
    }
  };

  const renderTrackPoint = (pointValue: number) => (
    <SliderTrackPoint
      key={pointValue}
      selectedValue={selectedValue}
      value={pointValue}
      onPress={slideToTrackPoint}
      disableColorChange={centered}
      style={trackPointStyle}
    />
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.container, style]} onLayout={handleLayoutChange} {...props}>
        <SliderTrack
          style={[
            {backgroundColor: centered ? secondaryContainer.background : primary.background},
            styles.filledTrack,
            filledTrackAnimatedStyle,
            filledTrackStyle,
          ]}
        />
        <SliderIndicator
          sliding={sliding}
          animValueProps={animValueProps}
          style={[styles.thumb, indicatorStyle]}
          thumbStyle={thumbStyle}
          valueStyle={valueStyle}
        />
        <SliderTrack
          style={[{backgroundColor: secondaryContainer.background}, styles.remainingTrack, remainingTrackAnimatedStyle, remainingTrackStyle]}
        />
        <View style={[styles.trackPoints, {justifyContent: trackPointsJustifyContent}, trackPointsStyle]}>{trackPoints.map(renderTrackPoint)}</View>
      </View>
    </GestureDetector>
  );
};
