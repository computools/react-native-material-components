export const normalize = (value: number, step: number = 0) => {
  'worklet';

  return step ? Math.round(value / step) * step : value;
};
