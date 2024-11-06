import {StyleSheet, type ViewStyle} from 'react-native';

import {FloatingActionButtonSize} from './FloatingActionButton.component';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,

    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
});

export const getBaseFloatingButtonShape = (size: FloatingActionButtonSize) => {
  const buttonSizes: Record<FloatingActionButtonSize, ViewStyle> = {
    [FloatingActionButtonSize.SMALL]: {minWidth: 40, height: 40, borderRadius: 12},
    [FloatingActionButtonSize.BIG]: {minWidth: 56, height: 56, borderRadius: 16},
  };

  return StyleSheet.create({
    container: buttonSizes[size] || buttonSizes[FloatingActionButtonSize.SMALL],
  });
};
