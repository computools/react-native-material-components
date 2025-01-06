import {useMemo} from 'react';
import {useTheme} from '../theme/useTheme.hook';
import {convertToRGBA} from '../utils/convert-to-rgba';

export const useSliderColors = (disabled: boolean, centered: boolean) => {
  const theme = useTheme();

  const [filledTrackColor, remainingTrackColor] = useMemo(() => {
    const disabledRemainingTrackColor = convertToRGBA(theme.surface.text as string, 0.12);
    const [enabledFilledTrackColor, disabledFilledTrackColor] = centered
      ? [theme.secondaryContainer.background, disabledRemainingTrackColor]
      : [theme.primary.background, convertToRGBA(theme.surface.text as string, 0.38)];

    return disabled ? [disabledFilledTrackColor, disabledRemainingTrackColor] : [enabledFilledTrackColor, theme.secondaryContainer.background];
  }, [disabled, centered, theme]);

  return {
    filledTrackColor,
    remainingTrackColor,
  };
};
