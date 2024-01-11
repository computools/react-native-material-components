import {argbFromHex, argbFromRgb, argbFromRgba, hexFromArgb, TonalPalette} from '@material/material-color-utilities';

import type {Palette} from './palette.types';
import {type ThemeColors} from './theme.types';

const HEX_REGEX = /^#(?:[A-Fa-f0-9]{3}){1,2}$/;
const RGB_REGEX = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
const RGBA_REGEX = /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Rgba extends Rgb {
  a: number;
}

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

  if (RGB_REGEX.test(color)) {
    const rgb = getRgb(color);

    if (rgb) {
      return argbFromRgb(rgb.r, rgb.g, rgb.b);
    }
  }

  if (RGBA_REGEX.test(color)) {
    const rgba = getRgba(color);

    if (rgba) {
      return argbFromRgba(rgba);
    }
  }

  throw new Error('Provided colors must be hex, rgb or rgba');
};

const getRgb = (color: string) => {
  const match = color.match(/\d+/g);
  const rgb = {} as Rgb;

  if (!match) {
    return null;
  }

  rgb.r = Number(match[0]);

  if (match[1]) {
    rgb.g = Number(match[1]);
  }

  if (match[2]) {
    rgb.b = Number(match[2]);
  }

  return rgb;
};

const getRgba = (color: string) => {
  const rgb = getRgb(color);
  const rgba = {...rgb} as Rgba;
  const match = color.match(RGBA_REGEX);

  if (!match) {
    return null;
  }

  if (match[4]) {
    rgba.a = Number(match[4]);
  }

  return rgba;
};
