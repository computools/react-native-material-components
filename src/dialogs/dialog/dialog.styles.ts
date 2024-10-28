import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    zIndex: 1,
    position: 'absolute',

    width: 312,
    padding: 24,
    borderRadius: 28,
  },
});
