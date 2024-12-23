export const validateSliderRange = (range: number[]) => {
  if (range.length !== 2) {
    throw new Error('Range length must be equal 2');
  }

  if (range[0]! > range[1]!) {
    throw new Error('Min value must be less or equal to max');
  }
};
