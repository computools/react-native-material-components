import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {styles} from './elevated-button.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {CommonButton, type CommonButtonProps} from '../common-button/CommonButton.component';

export const ElevatedButton = <T extends IconProps>({titleStyle, style, iconProps = {} as T, ...props}: CommonButtonProps<T>) => {
  const {primary, surface, shadow, surfaceContainer} = useTheme();

  const colorStyles = useMemo(
    () =>
      StyleSheet.create(
        props.disabled
          ? {
              title: {color: convertToRGBA(surface.text as string, 0.38)},
              container: {backgroundColor: convertToRGBA(surface.text as string, 0.12)},
            }
          : {title: {color: primary.background}, container: {backgroundColor: surfaceContainer.backgroundLow, shadowColor: shadow}}
      ),
    [props.disabled]
  );

  return (
    <CommonButton
      style={[colorStyles.container, styles.container, style]}
      titleStyle={[colorStyles.title, titleStyle]}
      iconProps={{color: colorStyles.title.color, ...iconProps}}
      {...props}
    />
  );
};
