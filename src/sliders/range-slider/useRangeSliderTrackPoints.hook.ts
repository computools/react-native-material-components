import {type SliderConfig} from '../slider-config.type';

export const useRangeSliderTrackPoints = ({max, min, step, centered}: SliderConfig) => {
  const getDiscreteRangeSliderTrackPoints = (discreteStep: number) => {
    const totalPoints = Math.ceil((max - min) / discreteStep) + 1;

    return Array.from({length: totalPoints}, (_, index) => Math.min(min + index * discreteStep, max));
  };

  const getContinuousRangeSliderTrackPoints = () => (centered ? [min, (min + max) / 2, max] : [min, max]);

  const trackPoints = step ? getDiscreteRangeSliderTrackPoints(step) : getContinuousRangeSliderTrackPoints();

  return trackPoints;
};
