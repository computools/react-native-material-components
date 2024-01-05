import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',

    width: 55,
    height: 30,

    borderRadius: 16,
  },
  handle: {
    position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 2,
    width: 24,
    height: 24,

    borderRadius: 12,
  },
});
