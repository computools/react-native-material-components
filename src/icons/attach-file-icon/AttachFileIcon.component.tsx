import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {path} from './path.json';
import type {IconProps} from '../icon-props';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = '#000';

export const AttachFileIcon: React.FC<IconProps> = ({color = DEFAULT_COLOR, size = DEFAULT_SIZE}) => (
  <Svg viewBox="0 0 24 24" width={size} height={size} fill={'none'}>
    <Path fill={color} d={path} />
  </Svg>
);
