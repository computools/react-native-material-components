import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumb: {
    zIndex: 1,
  },
  trackPoints: {
    position: 'absolute',

    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
    paddingHorizontal: 4,
  },
  filledTrack: {
    borderRadius: 2,
  },
  remainingBeforeTrack: {
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
    borderTopStartRadius: 16,
    borderBottomStartRadius: 16,
  },
  remainingAfterTrack: {
    justifyContent: 'center',

    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
    borderTopStartRadius: 2,
    borderBottomStartRadius: 2,
  },
});
