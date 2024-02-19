import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    position: 'absolute',

    alignSelf: 'center',

    width: '85%',
    padding: 24,

    borderRadius: 28,
  },
});
