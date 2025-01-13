import {type SliderConfig} from '../slider-config.type';

export const useSliderTrackPoints = ({max, min, step, centered}: SliderConfig) => {
  const getDiscreteSliderTrackPoints = (discreteStep: number) => {
    const totalPoints = Math.ceil((max - min) / discreteStep) + 1;

    return Array.from({length: totalPoints}, (_, index) => Math.min(min + index * discreteStep, max));
  };

  const getContinuousSliderTrackPoints = () => (centered ? [min, (min + max) / 2, max] : [max]);

  const trackPoints = step ? getDiscreteSliderTrackPoints(step) : getContinuousSliderTrackPoints();

  return trackPoints;
};
