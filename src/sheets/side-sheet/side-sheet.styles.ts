import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sideSheet: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,

    overflow: 'hidden',
  },
  leftSideSheet: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  rightSideSheet: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
});
