import {type ColorValue} from 'react-native';

export interface IconProps extends BaseIconProps {
  [key: string]: any;
}

export interface BaseIconProps {
  size?: number;
  color?: ColorValue;
}
