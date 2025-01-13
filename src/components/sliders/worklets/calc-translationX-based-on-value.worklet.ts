import {type SliderConfig} from '../slider-config.type';

export const calcTranslationXBasedOnValue = ({min, max}: Pick<SliderConfig, 'min' | 'max'>, value: number, width: number) => {
  'worklet';

  return ((value - min) / (max - min)) * width;
};
