import React, {useMemo} from 'react';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {getColorStyles, styles} from './assist-chip.styles';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';

export interface AssistChipProps<T extends IconProps> extends BaseChipProps {
  elevated?: boolean;
  LeadingIcon?: React.FC<T>;
  leadingIconType?: LeadingIconType;
  leadingIconProps?: T;
}

export enum LeadingIconType {
  COMMON = 'COMMON',
  FAVICON = 'FAVICON',
  BRANDED = 'BRANDED',
}

export const AssistChip = <T extends IconProps>({
  elevated = false,
  LeadingIcon,
  leadingIconType = LeadingIconType.COMMON,
  leadingIconProps = {} as T,
  style,
  labelStyle,
  disabled = false,
  ...props
}: AssistChipProps<T>) => {
  const theme = useTheme();
  const colorStyles = useMemo(() => getColorStyles(elevated, disabled, theme), [disabled, elevated, theme]);

  const leadingIconPropsMap: Record<LeadingIconType, IconProps> = {
    [LeadingIconType.COMMON]: {size: 18, color: colorStyles.icon.color},
    [LeadingIconType.FAVICON]: {size: 18},
    [LeadingIconType.BRANDED]: {size: 18, style: {opacity: 0.38}},
  };

  return (
    <BaseChip
      style={[elevated && !disabled ? styles.elevatedContainer : styles.outlinedContainer, colorStyles.container, style]}
      labelStyle={[colorStyles.label, labelStyle]}
      leadingIcon={LeadingIcon ? <LeadingIcon {...leadingIconPropsMap[leadingIconType]} {...leadingIconProps} /> : null}
      {...props}
    />
  );
};
