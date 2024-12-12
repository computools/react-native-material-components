import {StyleSheet, type ViewStyle, type TextStyle} from 'react-native';

import {TopAppBarSize} from './TopAppBar.component';

export const BASE_TOP_APP_BAR_PADDING_VERTICAL = 20;

const baseStyles = StyleSheet.create({
  actionsBar: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  actions: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const smallStyles = StyleSheet.create({
  actionsBar: baseStyles.actionsBar,
  title: {
    flex: 1,
  },
  actions: baseStyles.actions,
});

const mediumStyles = StyleSheet.create({
  container: {
    gap: 16,

    paddingBottom: 24,
  },
  actionsBar: {
    ...baseStyles.actionsBar,
    justifyContent: 'space-between',
  },
  title: {
    marginStart: 8,
  },
  actions: baseStyles.actions,
});

const largeStyles = StyleSheet.create({
  container: {
    gap: 44,

    paddingBottom: 28,
  },
  actionsBar: {
    ...baseStyles.actionsBar,
    justifyContent: 'space-between',
  },
  title: {
    marginStart: 8,
  },
  actions: baseStyles.actions,
});

interface TopAppBarStyle {
  container?: ViewStyle;
  actionsBar: ViewStyle;
  actions: ViewStyle;
  title: TextStyle;
}

export const styles: Record<TopAppBarSize, TopAppBarStyle> = {
  [TopAppBarSize.SMALL]: smallStyles,
  [TopAppBarSize.MEDIUM]: mediumStyles,
  [TopAppBarSize.LARGE]: largeStyles,
};
