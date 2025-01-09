import {useMemo} from 'react';

import {useTheme} from '../theme/useTheme.hook';
import {convertToRGBA} from '../utils/convert-to-rgba';
import {getTextInputActiveColors} from './get-text-input-active-colors';
import {getTextInputDisabledColors} from './get-text-input-disabled-colors';

interface UseTextInputColorsParams {
  isError: boolean;
  disabled: boolean;
}

export const useTextInputColors = ({disabled, isError}: UseTextInputColorsParams) => {
  const theme = useTheme();

  const [primaryColorBasedOnError, surfaceVariantColorBasedOnError] = isError
    ? [theme.error.background, theme.error.background]
    : [theme.primary.background, theme.surface.textVariant];

  const [disabledOnSurfaceColor, disabledSurfaceContaienerHighestColor] = useMemo(
    () => [convertToRGBA(theme.surface.text as string, 0.38), convertToRGBA(theme.surfaceContainer.backgroundHighest as string, 0.38)],
    [theme]
  );

  const colors = useMemo(
    () =>
      disabled
        ? getTextInputDisabledColors(disabledOnSurfaceColor, disabledSurfaceContaienerHighestColor)
        : getTextInputActiveColors(theme, primaryColorBasedOnError, surfaceVariantColorBasedOnError),
    [disabled, disabledOnSurfaceColor, disabledSurfaceContaienerHighestColor, primaryColorBasedOnError, surfaceVariantColorBasedOnError]
  );

  return colors;
};
