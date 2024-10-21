import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const TextButton: React.FC<CommonButtonProps> = ({titleStyle, ...props}) => {
  const {primary, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create({
        title: props.disabled ? {color: surface.text, opacity: 0.38} : {color: primary.background},
      }),
    [props.disabled]
  );

  return <CommonButton titleStyle={[colorStyles.title, titleStyle]} {...props} />;
};
