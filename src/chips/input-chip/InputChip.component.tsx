import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';

import {CloseIcon} from '../../icons';
import {styles} from './input-chip.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';

export interface InputChipProps<T extends IconProps> extends BaseChipProps {
  selected?: boolean;
  imageUrl?: string;
  LeadingIcon?: React.FC<T>;
  leadingIconProps?: T;
  hasTrailingIcon?: boolean;
  iconSize?: number;
}

export const InputChip = <T extends IconProps>({
  selected = false,
  LeadingIcon,
  imageUrl,
  hasTrailingIcon = true,
  leadingIconProps = {} as T,
  style,
  labelStyle,
  iconSize = 18,
  ...props
}: InputChipProps<T>) => {
  const {surface, secondaryContainer, outline, primary} = useTheme();

  const onContainerColor = selected ? secondaryContainer.text : surface.textVariant;

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          borderWidth: Number(!selected),
          borderColor: outline,
          backgroundColor: selected ? secondaryContainer.background : 'transparent',
        },
        label: {
          color: onContainerColor,
        },
      }),
    [selected, onContainerColor]
  );

  const renderLeadingAvatar = () => (imageUrl ? <Image style={styles.leadingImage} source={{uri: imageUrl}} /> : null);

  return (
    <BaseChip
      style={[dynamicStyles.container, imageUrl ? styles.chipWithAvatarContainer : [], style]}
      labelStyle={[dynamicStyles.label, labelStyle]}
      leadingIcon={LeadingIcon ? <LeadingIcon size={iconSize} color={primary.background} {...leadingIconProps} /> : renderLeadingAvatar()}
      trailingIcon={hasTrailingIcon ? <CloseIcon size={iconSize} color={onContainerColor} /> : null}
      {...props}
    />
  );
};
