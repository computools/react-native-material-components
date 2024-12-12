import {StyleSheet} from 'react-native';

export const BOTTOM_APP_BAR_PADDING_VARTICAL = 20;

export const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // marginTop: 'auto',

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
