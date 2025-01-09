import {type ColorValue} from 'react-native';

import {TextInputColors} from './text-input.types';

export const getTextInputDisabledColors = (disabledOnContainerColor: ColorValue, disabledContaienerColor: ColorValue) => {
  const colors = Object.values(TextInputColors).reduce((acc, key) => {
    acc[key] = disabledOnContainerColor;

    return acc;
  }, {} as Record<TextInputColors, ColorValue>);

  colors[TextInputColors.CONTAINER_COLOR] = disabledContaienerColor;

  return colors;
};
