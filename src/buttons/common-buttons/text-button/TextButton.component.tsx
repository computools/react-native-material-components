import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const TextButton = <T extends IconProps>({titleStyle, iconProps = {} as T, ...props}: CommonButtonProps<T>) => {
  const {primary, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create({
        title: {color: props.disabled ? convertToRGBA(surface.text as string, 0.38) : primary.background},
      }),
    [props.disabled]
  );

  return <CommonButton titleStyle={[colorStyles.title, titleStyle]} iconProps={{color: colorStyles.title.color, ...iconProps}} {...props} />;
};
