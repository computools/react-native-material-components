import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const TonalButton: React.FC<CommonButtonProps> = ({titleStyle, style, ...props}) => {
  const {secondaryContainer, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create(
        props.disabled
          ? {
              title: {color: convertToRGBA(surface.text as string, 0.38)},
              container: {borderColor: convertToRGBA(surface.text as string, 0.12)},
            }
          : {title: {color: secondaryContainer.text}, container: {backgroundColor: secondaryContainer.background}}
      ),
    [props.disabled]
  );

  return (
    <CommonButton
      style={[colorStyles.container, style]}
      titleStyle={[colorStyles.title, titleStyle]}
      iconProps={{color: colorStyles.title.color}}
      {...props}
    />
  );
};
