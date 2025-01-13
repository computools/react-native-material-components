import {StyleSheet} from 'react-native';

import {TabType} from './Tab.component';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 14,
  },
  [`badge${TabType.PRIMATY}`]: {
    top: -2,
    zIndex: 1,
    position: 'absolute',

    alignSelf: 'flex-start',
  },
  [`badge${TabType.SECONDARY}`]: {
    end: 4,
  },
  [`innerContent${TabType.PRIMATY}`]: {
    gap: 2,
    alignItems: 'center',
  },
  [`innerContent${TabType.SECONDARY}`]: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
