import React, {useMemo} from 'react';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {getColorStyles, styles} from './assist-chip.styles';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';

export enum LeadingIconType {
  COMMON = 'COMMON',
  FAVICON = 'FAVICON',
  BRANDED = 'BRANDED',
}

export interface AssistChipProps<T extends IconProps> extends BaseChipProps {
  elevated?: boolean;
  LeadingIcon?: React.FC<T>;
  leadingIconType?: LeadingIconType;
  leadingIconProps?: T;
  iconSize?: number;
}

export const AssistChip = <T extends IconProps>({
  elevated = false,
  LeadingIcon,
  leadingIconType = LeadingIconType.COMMON,
  leadingIconProps = {} as T,
  iconSize = 18,
  style,
  labelStyle,
  disabled = false,
  ...props
}: AssistChipProps<T>) => {
  const theme = useTheme();
  const colorStyles = useMemo(() => getColorStyles(elevated, disabled, theme), [disabled, elevated, theme]);

  const leadingIconPropsMap: Record<LeadingIconType, IconProps> = {
    [LeadingIconType.COMMON]: {size: iconSize, color: colorStyles.icon.color},
    [LeadingIconType.FAVICON]: {size: iconSize},
    [LeadingIconType.BRANDED]: {size: iconSize, style: {opacity: 0.38}},
  };

  return (
    <BaseChip
      style={[elevated && !disabled ? styles.elevatedContainer : styles.outlinedContainer, colorStyles.container, style]}
      labelStyle={[colorStyles.label, labelStyle]}
      leadingIcon={LeadingIcon ? <LeadingIcon {...leadingIconPropsMap[leadingIconType]} {...leadingIconProps} /> : null}
      disabled={disabled}
      {...props}
    />
  );
};
