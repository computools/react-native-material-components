import {StyleSheet} from 'react-native';

import {TabType} from './Tab.component';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 14,
  },
  [TabType.PRIMATY]: {
    gap: 2,
    alignItems: 'center',
  },
  [TabType.SECONDARY]: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
