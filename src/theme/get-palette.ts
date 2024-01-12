import {argbFromHex, argbFromRgb, argbFromRgba, hexFromArgb, TonalPalette} from '@material/material-color-utilities';

import type {Palette} from './palette.types';
import {type ThemeColors} from './theme.types';

const HEX_REGEX = /^#(?:[A-Fa-f0-9]{3}){1,2}$/;
const RGB_REGEX = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
const RGBA_REGEX = /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

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

const getHexTone = (color: string, tone: number) => {
  const argbColor = TonalPalette.fromInt(getArgbColor(color)).tone(tone);

  return hexFromArgb(argbColor);
};

const getArgbColor = (color: string) => {
  if (HEX_REGEX.test(color)) {
    return argbFromHex(color);
  }

  const rgb = getRgb(color);
  const rgba = getRgba(color);

  if (rgb) {
    return argbFromRgb(rgb.r, rgb.g, rgb.b);
  }

  if (rgba) {
    return argbFromRgba(rgba);
  }

  throw new Error('Provided colors must be hex, rgb or rgba');
};

const getRgb = (color: string) => {
  const match = color.match(RGB_REGEX);

  return match ? {r: Number(match[1]), g: Number(match[2]), b: Number(match[3])} : null;
};

const getRgba = (color: string) => {
  const match = color.match(RGBA_REGEX);

  return match ? {r: Number(match[1]), g: Number(match[2]), b: Number(match[3]), a: Number(match[4])} : null;
};
