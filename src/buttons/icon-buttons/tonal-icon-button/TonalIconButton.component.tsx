import React from 'react';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconButtonProps} from '../icon-button.types';
import {type ColorValue} from '../../../theme/theme.types';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {BaseIconButton} from '../base-icon-button/BaseIconButton.component';

export const TonalIconButton: React.FC<IconButtonProps> = ({selected, Icon, selectedIcon, style, ...props}) => {
  const {surfaceContainer, surface, secondaryContainer} = useTheme();

  const disabledIconColor = convertToRGBA(surface.text as ColorValue, 0.38);
  const disabledContainerColor = convertToRGBA(surface.text as ColorValue, 0.12);

  const [activeContainerColor, activeIconColor, IconComponent] = selected
    ? [secondaryContainer.background, secondaryContainer.text, selectedIcon ?? Icon]
    : [surfaceContainer.backgroundHighest, surface.textVariant, Icon];
  const [appliedContainerColor, appliedIconColor] = props.disabled
    ? [disabledContainerColor, disabledIconColor]
    : [activeContainerColor, activeIconColor];

  return (
    <BaseIconButton style={[{backgroundColor: appliedContainerColor}, style]} Icon={IconComponent} iconProps={{color: appliedIconColor}} {...props} />
  );
};
