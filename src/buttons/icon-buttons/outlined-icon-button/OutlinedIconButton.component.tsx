import React, {useMemo} from 'react';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {type IconButtonProps} from '../icon-button.types';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {BaseIconButton} from '../base-icon-button/BaseIconButton.component';

export const OutlinedIconButton = <T extends IconProps>({selected, Icon, selectedIcon, iconProps = {} as T, style, ...props}: IconButtonProps<T>) => {
  const {surface, outline} = useTheme();

  const [disabledIconColor, disabledContainerColor] = useMemo(
    () => [convertToRGBA(surface.text as string, 0.38), convertToRGBA(surface.text as string, 0.12)],
    [surface.text]
  );

  const appliedDisabledContainerColor = selected ? disabledContainerColor : 'transparent';
  const [activeContainerColor, activeIconColor, activeBorderColor, IconComponent] = selected
    ? [surface.backgroundInverse, surface.textInverse, surface.backgroundInverse, selectedIcon ?? Icon]
    : ['transparent', surface.textVariant, outline, Icon];
  const [appliedContainerColor, appliedIconColor, appliedBorderColor] = props.disabled
    ? [appliedDisabledContainerColor, disabledIconColor, disabledContainerColor]
    : [activeContainerColor, activeIconColor, activeBorderColor];

  return (
    <BaseIconButton
      Icon={IconComponent}
      iconProps={{color: appliedIconColor, ...iconProps}}
      style={[{backgroundColor: appliedContainerColor, borderColor: appliedBorderColor, borderWidth: Number(!selected)}, style]}
      {...props}
    />
  );
};
