import {type ColorValue} from 'react-native';
import {argbFromHex, rgbaFromArgb} from '@material/material-color-utilities';

import {type ColorRgba} from '../theme/theme.types';

const BLACK_RGBA = 'rgba(0, 0, 0, 1)';

export const convertToRGBA = (color: string, opacity: number): ColorValue => {
  if (color.startsWith('#')) {
    const argb = argbFromHex(color);
    const {r, g, b} = rgbaFromArgb(argb);

    return `rgba(${r}, ${g}, ${b}, ${opacity})` as ColorRgba;
  }

  if (color.startsWith('rgba')) {
    return color;
  }

  if (color.startsWith('rgb')) {
    const [r, g, b] = color.match(/\d+/g)!.slice(0, 3);

    return `rgba(${r}, ${g}, ${b}, ${opacity})` as ColorRgba;
  }

  return BLACK_RGBA;
};
