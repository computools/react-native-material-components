import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {path} from './path.json';
import type {IconProps} from '../icon-props';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = '#000';

export const EditIcon = ({color = DEFAULT_COLOR, size = DEFAULT_SIZE, ...props}: IconProps) => (
  <Svg viewBox="0 0 24 24" width={size} height={size} {...props}>
    <Path fill={color} d={path} />
  </Svg>
);
