import React from 'react';
import {TouchableOpacity, type TouchableOpacityProps} from 'react-native';

import {type IconProps} from '../../../types/icon-props.type';
import {getIconButtonFrameStyles, styles} from './base-icon-button.styles';

export interface BaseIconButtonProps<T extends IconProps> extends TouchableOpacityProps {
  Icon: React.FC<T>;
  iconProps: T;

  size?: number;
}

const DEFAULT_SIZE = 40;
const ICON_SIZE_COEFF = 0.6;

export const BaseIconButton = <T extends IconProps>({Icon, size = DEFAULT_SIZE, iconProps, style, ...props}: BaseIconButtonProps<T>) => (
  <TouchableOpacity style={[styles.container, getIconButtonFrameStyles(size), style]} hitSlop={8} {...props}>
    <Icon size={size * ICON_SIZE_COEFF} {...iconProps} />
  </TouchableOpacity>
);
