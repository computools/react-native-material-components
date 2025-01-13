import React, {useMemo} from 'react';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {getColorStyles, styles} from './assist-chip.styles';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';

export enum IconType {
  COMMON = 'COMMON',
  FAVICON = 'FAVICON',
  BRANDED = 'BRANDED',
}

export interface AssistChipProps<T extends IconProps> extends Omit<BaseChipProps, 'leadingIcon' | 'trailingIcon'> {
  elevated?: boolean;
  LeadingIcon?: React.FC<T>;
  TrailingIcon?: React.FC<T>;
  leadingIconType?: IconType;
  trailingIconType?: IconType;
  leadingIconProps?: T;
  trailingIconProps?: T;
  iconSize?: number;
}

export const AssistChip = <T extends IconProps>({
  elevated = false,
  LeadingIcon,
  TrailingIcon,
  leadingIconType = IconType.COMMON,
  trailingIconType = IconType.COMMON,
  leadingIconProps = {} as T,
  trailingIconProps = {} as T,
  iconSize = 18,
  style,
  labelStyle,
  disabled = false,
  ...props
}: AssistChipProps<T>) => {
  const theme = useTheme();
  const colorStyles = useMemo(() => getColorStyles(elevated, disabled, theme), [disabled, elevated, theme]);

  const iconPropsMap: Record<IconType, IconProps> = {
    [IconType.COMMON]: {size: iconSize, color: colorStyles.icon.color},
    [IconType.FAVICON]: {size: iconSize},
    [IconType.BRANDED]: {size: iconSize, style: {opacity: 0.38}},
  };

  return (
    <BaseChip
      style={[elevated && !disabled ? styles.elevatedContainer : styles.outlinedContainer, colorStyles.container, style]}
      labelStyle={[colorStyles.label, labelStyle]}
      leadingIcon={LeadingIcon ? <LeadingIcon {...iconPropsMap[leadingIconType]} {...leadingIconProps} /> : null}
      trailingIcon={TrailingIcon ? <TrailingIcon {...iconPropsMap[trailingIconType]} {...trailingIconProps} /> : null}
      disabled={disabled}
      {...props}
    />
  );
};
