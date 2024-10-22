import React from 'react';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconButtonProps} from '../icon-button.types';
import {type ColorValue} from '../../../theme/theme.types';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {BaseIconButton} from '../base-icon-button/BaseIconButton.component';

export const FilledIconButton: React.FC<IconButtonProps> = ({selected, Icon, selectedIcon, style, ...props}) => {
  const {primary, surface, surfaceContainer} = useTheme();

  const disabledIconColor = convertToRGBA(surface.text as ColorValue, 0.38);
  const disabledContainerColor = convertToRGBA(surface.text as ColorValue, 0.12);

  const [activeContainerColor, activeIconColor, IconComponent] = selected
    ? [primary.background, primary.text, selectedIcon ?? Icon]
    : [surfaceContainer.backgroundHighest, primary.background, Icon];
  const [appliedContainerColor, appliedIconColor] = props.disabled
    ? [disabledContainerColor, disabledIconColor]
    : [activeContainerColor, activeIconColor];

  return (
    <BaseIconButton style={[{backgroundColor: appliedContainerColor}, style]} Icon={IconComponent} iconProps={{color: appliedIconColor}} {...props} />
  );
};
