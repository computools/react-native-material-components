import {type ColorValue} from 'react-native';

import {type Theme} from '../theme/theme.types';
import {TextInputColors} from './text-input.types';

export const getTextInputActiveColors = (theme: Theme, primaryColorBasedOnError: ColorValue, surfaceVariantColorBasedOnError: ColorValue) => ({
  [TextInputColors.VALUE_COLOR]: theme.surface.text,
  [TextInputColors.CONTAINER_COLOR]: theme.surfaceContainer.backgroundHighest,
  [TextInputColors.SELECTION_COLOR]: primaryColorBasedOnError,
  [TextInputColors.PLACEHOLDER_COLOR]: theme.surface.textVariant,
  [TextInputColors.LABEL_FOCUSED_COLOR]: primaryColorBasedOnError,
  [TextInputColors.TRAILING_ICON_COLOR]: surfaceVariantColorBasedOnError,
  [TextInputColors.LEADING_ICON_COLOR]: theme.surface.textVariant,
  [TextInputColors.LABEL_UNFOCUSED_COLOR]: surfaceVariantColorBasedOnError,
  [TextInputColors.SUPPORING_TEXT_COLOR]: surfaceVariantColorBasedOnError,
  [TextInputColors.ACTIVE_INDICATOR_FOCUSED_COLOR]: primaryColorBasedOnError,
  [TextInputColors.ACTIVE_INDICATOR_UNFOCUSED_COLOR]: surfaceVariantColorBasedOnError,
});
