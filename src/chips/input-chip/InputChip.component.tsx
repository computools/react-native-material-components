import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';

import {CloseIcon} from '../../icons';
import {styles} from './input-chip.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';

export interface InputChipProps<T extends IconProps> extends Omit<BaseChipProps, 'leadingIcon' | 'trailingIcon'> {
  selected?: boolean;
  imageUrl?: string;
  LeadingIcon?: React.FC<T>;
  TrailingIcon?: React.FC<T>;
  leadingIconProps?: T;
  trailingIconProps?: T;
  hasDefaultTrailingIcon?: boolean;
  iconSize?: number;
}

export const InputChip = <T extends IconProps>({
  selected = false,
  LeadingIcon,
  TrailingIcon,
  imageUrl,
  leadingIconProps = {} as T,
  trailingIconProps = {} as T,
  hasDefaultTrailingIcon = true,
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
  const renderDefaultTrailingIcon = () => (hasDefaultTrailingIcon ? <CloseIcon size={iconSize} color={onContainerColor} /> : null);

  return (
    <BaseChip
      style={[dynamicStyles.container, imageUrl ? styles.chipWithAvatarContainer : [], style]}
      labelStyle={[dynamicStyles.label, labelStyle]}
      leadingIcon={LeadingIcon ? <LeadingIcon size={iconSize} color={primary.background} {...leadingIconProps} /> : renderLeadingAvatar()}
      trailingIcon={TrailingIcon ? <TrailingIcon size={iconSize} color={onContainerColor} {...trailingIconProps} /> : renderDefaultTrailingIcon()}
      {...props}
    />
  );
};
