import React, {useMemo} from 'react';

import {BaseSlider, type BaseSliderProps} from '../base-slider/BaseSlider.component';

export interface DiscreteSliderProps extends Omit<BaseSliderProps, 'trackPoints'> {
  step: number;
}

export const DiscreteSlider: React.FC<DiscreteSliderProps> = ({min, max, step, ...props}) => {
  const trackPoints = useMemo(() => {
    const totalPoints = Math.ceil((max - min) / step) + 1;

    return Array.from({length: totalPoints}, (_, index) => Math.min(min + index * step, max));
  }, [min, max, step]);

  return <BaseSlider min={min} max={max} trackPoints={trackPoints} {...props} />;
};
