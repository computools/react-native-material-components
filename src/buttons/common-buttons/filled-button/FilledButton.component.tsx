import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const FilledButton: React.FC<CommonButtonProps> = ({style, titleStyle, ...props}) => {
  const {primary, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create(
        props.disabled
          ? {title: {opacity: 0.38, color: surface.text}, container: {opacity: 0.12, backgroundColor: surface.text}}
          : {title: {color: primary.text}, container: {backgroundColor: primary.background}}
      ),
    [props.disabled]
  );

  return <CommonButton style={[colorStyles.container, style]} titleStyle={[colorStyles.title, titleStyle]} {...props} />;
};
