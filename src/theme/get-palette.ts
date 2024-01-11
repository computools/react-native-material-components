import {argbFromHex, hexFromArgb, TonalPalette} from '@material/material-color-utilities';

import type {Palette} from './palette.types';
import {type ThemeColors} from './theme.types';

const getHexTone = (color: string, tone: number) => {
  const argbColor = TonalPalette.fromInt(argbFromHex(color)).tone(tone);

  return hexFromArgb(argbColor);
};

export const getPalette = (themeColros: ThemeColors) => {
  const palette = {} as Palette;

  Object.entries(themeColros).forEach(([colorRole, color]) => {
    const colorTones = Array.from({length: 101}, (_, index: number) => getHexTone(color, index));

    colorTones.reduce((acc, colorTone, index) => {
      acc[`${colorRole}${index}`] = colorTone;

      return acc;
    }, palette);
  });

  return palette;
};
