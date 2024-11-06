import React, {useMemo} from 'react';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {type IconButtonProps} from '../icon-button.types';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {BaseIconButton} from '../base-icon-button/BaseIconButton.component';

export const TonalIconButton = <T extends IconProps>({selected, Icon, selectedIcon, iconProps = {} as T, style, ...props}: IconButtonProps<T>) => {
  const {surfaceContainer, surface, secondaryContainer} = useTheme();

  const [disabledIconColor, disabledContainerColor] = useMemo(
    () => [convertToRGBA(surface.text as string, 0.38), convertToRGBA(surface.text as string, 0.12)],
    [surface.text]
  );

  const [activeContainerColor, activeIconColor, IconComponent] = selected
    ? [secondaryContainer.background, secondaryContainer.text, selectedIcon ?? Icon]
    : [surfaceContainer.backgroundHighest, surface.textVariant, Icon];
  const [appliedContainerColor, appliedIconColor] = props.disabled
    ? [disabledContainerColor, disabledIconColor]
    : [activeContainerColor, activeIconColor];

  return (
    <BaseIconButton
      Icon={IconComponent}
      iconProps={{color: appliedIconColor, ...iconProps}}
      style={[{backgroundColor: appliedContainerColor}, style]}
      {...props}
    />
  );
};
