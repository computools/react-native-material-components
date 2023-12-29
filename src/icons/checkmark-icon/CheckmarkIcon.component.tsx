import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {path} from './path.json';
import type {IconProps} from '../../types/icon-props';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = '#ffffff';

export const CheckmarkIcon: React.FC<IconProps> = ({color, size = DEFAULT_SIZE}) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path fill={color ?? DEFAULT_COLOR} d={path} />
  </Svg>
);
