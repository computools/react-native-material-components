import {useMemo} from 'react';
import {useTheme} from '../theme/useTheme.hook';
import {convertToRGBA} from '../utils/convert-to-rgba';

interface UseTextInputColorsParams {
  isError: boolean;
  disabled: boolean;
}

export const useTextInputColors = ({disabled, isError}: UseTextInputColorsParams) => {
  const {surface, surfaceContainer, error, primary} = useTheme();

  const primaryColorBasedOnError = isError ? error.background : primary.background;
  const surfaceVariantColorBasedOnError = isError ? error.background : surface.textVariant;

  const [disabledOnSurfaceColor, disabledSurfaceContaienerHighestColor] = useMemo(
    () => [convertToRGBA(surface.text as string, 0.38), convertToRGBA(surfaceContainer.backgroundHighest as string, 0.38)],
    [surface, surfaceContainer]
  );

  const {
    valueColor,
    containerColor,
    selectionColor,
    placeholderColor,
    labelFocusedColor,
    trailingIconColor,
    leadingIconColor,
    labelUnfocusedColor,
    supportingTextColor,
    activeIndicatorFocusedColor,
    activeIndicatorUnfocusedColor,
  } = useMemo(
    () =>
      disabled
        ? {
            valueColor: disabledOnSurfaceColor,
            containerColor: disabledSurfaceContaienerHighestColor,
            selectionColor: disabledOnSurfaceColor,
            placeholderColor: disabledOnSurfaceColor,
            labelFocusedColor: disabledOnSurfaceColor,
            trailingIconColor: disabledOnSurfaceColor,
            leadingIconColor: disabledOnSurfaceColor,
            labelUnfocusedColor: disabledOnSurfaceColor,
            supportingTextColor: disabledOnSurfaceColor,
            activeIndicatorFocusedColor: disabledOnSurfaceColor,
            activeIndicatorUnfocusedColor: disabledOnSurfaceColor,
          }
        : {
            valueColor: surface.text,
            containerColor: surfaceContainer.backgroundHighest,
            selectionColor: primaryColorBasedOnError,
            placeholderColor: surface.textVariant,
            labelFocusedColor: primaryColorBasedOnError,
            trailingIconColor: surfaceVariantColorBasedOnError,
            leadingIconColor: surface.textVariant,
            labelUnfocusedColor: surfaceVariantColorBasedOnError,
            supportingTextColor: surfaceVariantColorBasedOnError,
            activeIndicatorFocusedColor: primaryColorBasedOnError,
            activeIndicatorUnfocusedColor: surfaceVariantColorBasedOnError,
          },
    [disabled, disabledOnSurfaceColor, disabledSurfaceContaienerHighestColor, primaryColorBasedOnError, surfaceVariantColorBasedOnError]
  );

  return {
    valueColor,
    containerColor,
    selectionColor,
    placeholderColor,
    labelFocusedColor,
    trailingIconColor,
    leadingIconColor,
    labelUnfocusedColor,
    supportingTextColor,
    activeIndicatorFocusedColor,
    activeIndicatorUnfocusedColor,
  };
};
