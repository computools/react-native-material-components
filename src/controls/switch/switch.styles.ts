import {StyleSheet} from 'react-native';

export const ENABLED_OPACITY = 1;
export const DISABLED_OPACITY = 0.38;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 32,
    width: 52,
    paddingHorizontal: 2,

    borderWidth: 2,
    borderRadius: 100,
  },
  handle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 'auto',

    width: 24,
    height: 24,

    borderRadius: 12,
  },
});
