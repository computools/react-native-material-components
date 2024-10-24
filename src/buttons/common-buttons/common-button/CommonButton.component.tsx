import React from 'react';
import {TouchableOpacity, Text, type StyleProp, type TextStyle, type TouchableOpacityProps} from 'react-native';

import {styles} from './common-button.styles';
import {type IconProps} from '../../../icons/icon-props';
import {useTypography} from '../../../typography/useTypography.component';

export interface CommonButtonProps extends TouchableOpacityProps {
  title: string;

  titleStyle?: StyleProp<TextStyle>;
  StartIcon?: React.FC<IconProps>;
  EndIcon?: React.FC<IconProps>;
  iconProps?: IconProps;
}

const DEFAULT_ICON_SIZE = 18;

export const CommonButton: React.FC<CommonButtonProps> = ({title, StartIcon, EndIcon, titleStyle, iconProps, style, ...props}) => {
  const {labelLarge} = useTypography();

  const containerPaddingStart = StartIcon || EndIcon ? 16 : 24;

  return (
    <TouchableOpacity style={[styles.container, {paddingStart: containerPaddingStart}, style]} hitSlop={16} {...props}>
      {StartIcon && <StartIcon size={DEFAULT_ICON_SIZE} {...iconProps} />}
      <Text style={[labelLarge, titleStyle]}>{title}</Text>
      {EndIcon && <EndIcon size={DEFAULT_ICON_SIZE} {...iconProps} />}
    </TouchableOpacity>
  );
};
