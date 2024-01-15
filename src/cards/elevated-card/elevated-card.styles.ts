import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,

    borderRadius: 12,
  },
  iosElevation: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  androidElevation: {
    elevation: 1,
  },
});
