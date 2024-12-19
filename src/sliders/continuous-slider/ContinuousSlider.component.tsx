import React from 'react';

import {styles} from './continuous-slider.styles';
import {BaseSlider, type BaseSliderProps} from '../base-slider/BaseSlider.component';

export type ContinuousSliderProps = Omit<BaseSliderProps, 'trackPoints'>;

export const ContinuousSlider: React.FC<ContinuousSliderProps> = ({max, trackPointsStyle, ...props}) => {
  const trackPoints = [max];

  return <BaseSlider trackPoints={trackPoints} max={max} trackPointsStyle={[styles.trackPoints, trackPointsStyle]} {...props} />;
};
