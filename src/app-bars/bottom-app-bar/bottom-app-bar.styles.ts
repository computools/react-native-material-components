import {StyleSheet} from 'react-native';

export const BOTTOM_APP_BAR_PADDING_VARTICAL = 16;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // marginTop: 'auto',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: BOTTOM_APP_BAR_PADDING_VARTICAL,
    paddingEnd: 16,
    paddingStart: 4,
  },
  iconButtons: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
