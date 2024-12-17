import React, {useMemo} from 'react';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {getDynamicStyles, styles} from './suggestion-chip.styles';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';

export interface SuggestionChipProps<T extends IconProps> extends Omit<BaseChipProps, 'leadingIcon' | 'trailingIcon'> {
  elevated?: boolean;
  selected?: boolean;
  LeadingIcon?: React.FC<T>;
  TrailingIcon?: React.FC<T>;
  leadingIconProps?: T;
  trailingIconProps?: T;
}

export const SuggestionChip = <T extends IconProps>({
  elevated = false,
  selected = false,
  LeadingIcon,
  TrailingIcon,
  leadingIconProps = {} as T,
  trailingIconProps = {} as T,
  style,
  labelStyle,
  disabled = false,
  ...props
}: SuggestionChipProps<T>) => {
  const theme = useTheme();
  const dynamicStyles = useMemo(() => getDynamicStyles(selected, elevated, disabled, theme), [disabled, elevated, selected, theme]);

  return (
    <BaseChip
      style={[elevated && !disabled ? styles.elevatedContainer : styles.outlinedContainer, dynamicStyles.container, style]}
      labelStyle={[dynamicStyles.label, labelStyle]}
      leadingIcon={LeadingIcon ? <LeadingIcon size={18} color={dynamicStyles.icon.color} {...leadingIconProps} /> : null}
      trailingIcon={TrailingIcon ? <TrailingIcon size={18} color={dynamicStyles.icon.color} {...trailingIconProps} /> : null}
      disabled={disabled}
      {...props}
    />
  );
};
