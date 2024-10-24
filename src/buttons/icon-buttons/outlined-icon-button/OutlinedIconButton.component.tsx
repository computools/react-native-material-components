import React, {useMemo} from 'react';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconButtonProps} from '../icon-button.types';
import {type ColorValue} from '../../../theme/theme.types';
import {convertToRGBA} from '../../../utils/convert-to-rgba';
import {BaseIconButton} from '../base-icon-button/BaseIconButton.component';

export const OutlinedIconButton: React.FC<IconButtonProps> = ({selected, Icon, selectedIcon, style, ...props}) => {
  const {surface, outline} = useTheme();

  const [disabledIconColor, disabledContainerColor] = useMemo(
    () => [convertToRGBA(surface.text as ColorValue, 0.38), convertToRGBA(surface.text as ColorValue, 0.12)],
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
      style={[{backgroundColor: appliedContainerColor, borderColor: appliedBorderColor, borderWidth: Number(!selected)}, style]}
      Icon={IconComponent}
      iconProps={{color: appliedIconColor}}
      {...props}
    />
  );
};
