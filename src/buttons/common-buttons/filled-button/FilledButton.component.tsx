import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const FilledButton: React.FC<CommonButtonProps> = ({style, titleStyle, ...props}) => {
  const {primary, surface} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create(
        props.disabled
          ? {
              title: {color: convertToRGBA(surface.text as string, 0.38)},
              container: {backgroundColor: convertToRGBA(surface.text as string, 0.12)},
            }
          : {title: {color: primary.text}, container: {backgroundColor: primary.background}}
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
