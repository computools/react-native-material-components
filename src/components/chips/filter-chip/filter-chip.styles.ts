import {StyleSheet} from 'react-native';

import {type Theme} from '../../../theme/theme.types';
import {convertToRGBA} from '../../../utils/convert-to-rgba';

export const styles = StyleSheet.create({
  outlinedContainer: {
    borderWidth: 1,
  },
  elevatedContainer: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 1,
  },
});

export const getDynamicStyles = (selected: boolean, elevated: boolean, disabled: boolean, theme: Theme) => {
  const labelDisabledColor = convertToRGBA(theme.surface.text as string, 0.38);
  const containerDisabledColor = convertToRGBA(theme.surface.textVariant as string, 0.12);

  const [disabledUnselectedBackgroundColorByType, disabledUnselectedBorderColorByType] = elevated
    ? [containerDisabledColor, 'transparent']
    : ['transparent', containerDisabledColor];
  const [disabledBackgroundColor, disabledBorderColor] = selected
    ? [containerDisabledColor, 'transparent']
    : [disabledUnselectedBackgroundColorByType, disabledUnselectedBorderColorByType];
  const enabledBackgroundColorByType = elevated ? theme.surfaceContainer.backgroundLow : 'transparent';
  const [enabledBackgroundColor, enabledBorderColor] = selected
    ? [theme.secondaryContainer.background, theme.secondaryContainer.background]
    : [enabledBackgroundColorByType, theme.outline];

  return StyleSheet.create(
    disabled
      ? {
          label: {
            color: labelDisabledColor,
          },
          container: {
            borderColor: disabledBorderColor,
            backgroundColor: disabledBackgroundColor,
          },
          icon: {
            color: labelDisabledColor,
          },
          selectedIcon: {
            color: labelDisabledColor,
          },
        }
      : {
          label: {
            color: theme.surface.text,
          },
          container: {
            borderColor: enabledBorderColor,
            borderWidth: 1,
            backgroundColor: enabledBackgroundColor,
          },
          icon: {
            color: theme.primary.background,
          },
          selectedIcon: {
            color: theme.secondaryContainer.text,
          },
        }
  );
};
