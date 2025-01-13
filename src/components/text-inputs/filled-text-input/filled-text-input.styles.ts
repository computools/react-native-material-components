import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
    width: '100%',
  },
  inputWithLabelContainer: {
    flex: 1,

    height: '100%',
  },
  input: {
    marginTop: 'auto',
    paddingBottom: 0,
    paddingStart: 0,
  },
  label: {
    position: 'absolute',
  },
  activeIndicator: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
  },
  supportingText: {
    alignSelf: 'flex-start',

    marginHorizontal: 16,
    marginTop: 4,
  },
  leadingIcon: {
    marginEnd: 16,
  },
  trailingIcon: {
    marginStart: 16,
  },
});
