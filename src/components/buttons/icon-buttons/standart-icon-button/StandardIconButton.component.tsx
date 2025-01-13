import React, {useMemo} from 'react';

import {useTheme} from '../../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {type IconButtonProps} from '../icon-button.types';
import {convertToRGBA} from '../../../../utils/convert-to-rgba';
import {BaseIconButton} from '../base-icon-button/BaseIconButton.component';

export const StandartIconButton = <T extends IconProps>({selected, Icon, selectedIcon, iconProps = {} as T, ...props}: IconButtonProps<T>) => {
  const {primary, surface} = useTheme();

  const disabledIconColor = useMemo(() => convertToRGBA(surface.text as string, 0.38), [surface.text]);

  const [iconColor, IconComponent] = selected ? [primary.background, selectedIcon ?? Icon] : [surface.textVariant, Icon];

  return <BaseIconButton Icon={IconComponent} iconProps={{color: props.disabled ? disabledIconColor : iconColor, ...iconProps}} {...props} />;
};
