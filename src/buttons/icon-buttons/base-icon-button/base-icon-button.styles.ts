import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const getIconButtonFrameStyles = (size: number) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size * 0.5,
    },
  }).container;
