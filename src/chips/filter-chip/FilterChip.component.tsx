import React, {useMemo} from 'react';
import Animated, {LinearTransition} from 'react-native-reanimated';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {getDynamicStyles, styles} from './filter-chip.styles';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';
import {CircularActivityIndicator} from '../../activity-indicators/circular-activity-indicator/CircularActivityIndicator.component';
import {FilterChipLeadingIcon} from './leading-icon/FilterChipLeadingIcon.component';

export interface FilterChipProps<T extends IconProps> extends Omit<BaseChipProps, 'leadingIcon' | 'trailingIcon'> {
  elevated?: boolean;
  selected?: boolean;
  loading?: boolean;
  LeadingIcon?: React.FC<T>;
  TrailingIcon?: React.FC<T>;
  leadingIconProps?: T;
  trailingIconProps?: T;
  iconSize?: number;
  activityIndicatorSize?: number;
}

export const FilterChip = <T extends IconProps>({
  elevated = false,
  selected = false,
  loading = false,
  LeadingIcon,
  TrailingIcon,
  leadingIconProps = {} as T,
  trailingIconProps = {} as T,
  iconSize = 18,
  activityIndicatorSize = 38,
  style,
  labelStyle,
  disabled = false,
  ...props
}: FilterChipProps<T>) => {
  const theme = useTheme();
  const dynamicStyles = useMemo(() => getDynamicStyles(selected, elevated, disabled, theme), [disabled, elevated, selected, theme]);

  const leadingIcon = loading ? (
    <CircularActivityIndicator size={activityIndicatorSize} style={{height: iconSize, width: iconSize}} />
  ) : (
    <FilterChipLeadingIcon
      size={iconSize}
      selected={selected}
      customLeadingIcon={LeadingIcon}
      color={dynamicStyles.icon.color}
      selectedColor={dynamicStyles.selectedIcon.color}
      leadingIconProps={leadingIconProps}
    />
  );

  return (
    <Animated.View layout={LinearTransition}>
      <BaseChip
        style={[elevated && !disabled ? styles.elevatedContainer : styles.outlinedContainer, dynamicStyles.container, style]}
        labelStyle={[dynamicStyles.label, labelStyle]}
        leadingIcon={leadingIcon}
        trailingIcon={TrailingIcon ? <TrailingIcon size={18} color={dynamicStyles.icon.color} {...trailingIconProps} /> : null}
        disabled={disabled}
        {...props}
      />
    </Animated.View>
  );
};
