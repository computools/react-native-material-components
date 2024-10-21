import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {styles} from './outlined-button.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const OutlinedButton: React.FC<CommonButtonProps> = ({titleStyle, style, ...props}) => {
  const {primary, outline, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create(
        props.disabled
          ? {title: {opacity: 0.38, color: surface.text}, container: {opacity: 0.12, borderColor: surface.text}}
          : {title: {color: primary.background}, container: {borderColor: outline}}
      ),
    [props.disabled]
  );

  return <CommonButton style={[styles.container, colorStyles.container, style]} titleStyle={[colorStyles.title, titleStyle]} {...props} />;
};
