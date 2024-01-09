import {StyleSheet} from 'react-native';

export const TRANSPARENT = 'transparent';

export const styles = StyleSheet.create({
  container: {
    padding: 16,

    borderWidth: 1,
    borderRadius: 16,
  },
  iosElevation: {
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  androidElevation: {
    borderRadius: 16,
    backgroundColor: TRANSPARENT,
    elevation: 5,
  },
});
