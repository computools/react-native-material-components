import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 4,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',

    height: '100%',
  },
  iconWithBadge: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  badge: {
    position: 'absolute',
    zIndex: 1,
    right: 16,
    top: 2,
  },
});
