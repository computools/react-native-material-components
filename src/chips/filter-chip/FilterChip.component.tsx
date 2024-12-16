import React, {useMemo} from 'react';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {getDynamicStyles, styles} from './filter-chip.styles';
import {BaseChip, type BaseChipProps} from '../base-chip/BaseChip.component';
import {DoneIcon} from '../../icons';
import {CircularActivityIndicator} from '../../activity-indicators/circular-activity-indicator/CircularActivityIndicator.component';
import Animated, {FadeIn, FadeOut, LinearTransition} from 'react-native-reanimated';

export interface FilterChipProps<T extends IconProps> extends BaseChipProps {
  elevated?: boolean;
  selected?: boolean;
  loading?: boolean;
  LeadingIcon?: React.FC<T>;
  leadingIconProps?: T;
  iconSize?: number;
  activityIndicatorSize?: number;
}

export const FilterChip = <T extends IconProps>({
  elevated = false,
  selected = false,
  loading = false,
  LeadingIcon,
  leadingIconProps = {} as T,
  iconSize = 18,
  activityIndicatorSize = 38,
  style,
  labelStyle,
  disabled = false,
  ...props
}: FilterChipProps<T>) => {
  const theme = useTheme();
  const dynamicStyles = useMemo(() => getDynamicStyles(selected, elevated, disabled, theme), [disabled, elevated, selected, theme]);

  const renerCustomLeadingIcon = () =>
    LeadingIcon ? (
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <LeadingIcon size={iconSize} color={dynamicStyles.leadingIcon.color} {...leadingIconProps} />
      </Animated.View>
    ) : null;

  const renderLeadingIcon = () => (selected ? <DoneIcon size={iconSize} color={dynamicStyles.selectedIcon.color} /> : renerCustomLeadingIcon());

  return (
    <Animated.View layout={LinearTransition}>
      <BaseChip
        style={[elevated && !disabled ? styles.elevatedContainer : styles.outlinedContainer, dynamicStyles.container, style]}
        labelStyle={[dynamicStyles.label, labelStyle]}
        leadingIcon={
          loading ? <CircularActivityIndicator size={activityIndicatorSize} style={{height: iconSize, width: iconSize}} /> : renderLeadingIcon()
        }
        disabled={disabled}
        {...props}
      />
    </Animated.View>
  );
};
