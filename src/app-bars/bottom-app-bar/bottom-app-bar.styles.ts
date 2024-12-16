import {StyleSheet} from 'react-native';

export const BOTTOM_APP_BAR_PADDING_VARTICAL = 20;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: BOTTOM_APP_BAR_PADDING_VARTICAL,
    paddingEnd: 16,
    paddingStart: 8,
  },
  iconButtons: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    end: 16,
  },
});
