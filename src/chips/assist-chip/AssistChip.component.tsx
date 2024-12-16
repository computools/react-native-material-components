import React, {useMemo} from 'react';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {getColorStyles, styles} from './assist-chip.styles';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';

export interface AssistChipProps<T extends IconProps> extends BaseChipProps {
  elevated?: boolean;
  LeadingIcon?: React.FC<T>;
  leadingIconProps?: T;
}

export const AssistChip = <T extends IconProps>({
  elevated = false,
  LeadingIcon,
  leadingIconProps = {} as T,
  style,
  labelStyle,
  disabled = false,
  ...props
}: AssistChipProps<T>) => {
  const theme = useTheme();
  const colorStyles = useMemo(() => getColorStyles(elevated, disabled, theme), [disabled, elevated, theme]);

  return (
    <BaseChip
      style={[elevated && !disabled ? styles.elevatedContainer : styles.outlinedContainer, colorStyles.container, style]}
      labelStyle={[colorStyles.label, labelStyle]}
      leadingIcon={LeadingIcon ? <LeadingIcon size={18} color={colorStyles.icon.color} {...leadingIconProps} /> : null}
      {...props}
    />
  );
};
