import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 16,
  },
  dragHandle: {
    alignSelf: 'center',

    width: 32,
    height: 4,
    borderRadius: 100,
  },
});
