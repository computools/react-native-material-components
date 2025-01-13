import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 10,

    overflow: 'hidden',
  },
  ripple: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});
