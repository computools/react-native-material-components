import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    gap: 2,
    flexDirection: 'column',
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    height: 2,
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
  },
});
