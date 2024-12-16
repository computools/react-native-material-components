import {StyleSheet} from 'react-native';

export const BASE_TOP_APP_BAR_PADDING_VERTICAL = 20;

export const styles = StyleSheet.create({
  container: {
    gap: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,

    textAlign: 'center',
  },
});
