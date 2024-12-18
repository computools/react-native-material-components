import {StyleSheet} from 'react-native';

import {type Theme} from '../../theme/theme.types';
import {convertToRGBA} from '../../utils/convert-to-rgba';

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

export const getColorStyles = (elevated: boolean, disabled: boolean, theme: Theme) => {
  const labelDisabledColor = convertToRGBA(theme.surface.text as string, 0.38);
  const containerDisabledColor = convertToRGBA(theme.surface.textVariant as string, 0.12);

  const [enabledBorderColor, enabledBackgroundColor] = elevated
    ? ['transparent', theme.surfaceContainer.backgroundLow]
    : [theme.outline, 'transparent'];
  const [disabledBorderColor, disabledBackgroundColor] = elevated ? ['transparent', containerDisabledColor] : [containerDisabledColor, 'transparent'];

  return StyleSheet.create(
    disabled
      ? {
          label: {
            color: labelDisabledColor,
          },
          container: {
            backgroundColor: disabledBackgroundColor,
            borderColor: disabledBorderColor,
          },
          icon: {
            color: labelDisabledColor,
          },
        }
      : {
          label: {
            color: theme.surface.text,
          },
          container: {
            borderColor: enabledBorderColor,
            backgroundColor: enabledBackgroundColor,
          },
          icon: {
            color: theme.primary.background,
          },
        }
  );
};
