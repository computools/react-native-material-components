import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const TonalButton: React.FC<CommonButtonProps> = ({titleStyle, style, ...props}) => {
  const {secondaryContainer, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create(
        props.disabled
          ? {title: {opacity: 0.38, color: surface.text}, container: {opacity: 0.12, borderColor: surface.text}}
          : {title: {color: secondaryContainer.text}, container: {backgroundColor: secondaryContainer.background}}
      ),
    [props.disabled]
  );

  return <CommonButton style={[colorStyles.container, style]} titleStyle={[colorStyles.title, titleStyle]} {...props} />;
};
