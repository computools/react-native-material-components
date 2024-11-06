import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {styles} from './outlined-button.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const OutlinedButton = <T extends IconProps>({titleStyle, style, iconProps = {} as T, ...props}: CommonButtonProps<T>) => {
  const {primary, outline, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create(
        props.disabled
          ? {title: {color: convertToRGBA(surface.text as string, 0.38)}, container: {borderColor: convertToRGBA(surface.text as string, 0.12)}}
          : {title: {color: primary.background}, container: {borderColor: outline}}
      ),
    [props.disabled]
  );

  return (
    <CommonButton
      titleStyle={[colorStyles.title, titleStyle]}
      style={[styles.container, colorStyles.container, style]}
      iconProps={{color: colorStyles.title.color, ...iconProps}}
      {...props}
    />
  );
};
