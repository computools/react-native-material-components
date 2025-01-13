import {StyleSheet} from 'react-native';

export const OUTLINED_TEXT_INPUT_CONTAINER_PADDING_VERTICAL = 8;
export const OUTLINED_TEXT_INPUT_CONTAINER_PADDING_HORIZONTAL = 16;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 56,
    paddingHorizontal: OUTLINED_TEXT_INPUT_CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: OUTLINED_TEXT_INPUT_CONTAINER_PADDING_VERTICAL,
    borderRadius: 4,
    width: '100%',
  },
  inputWithLabelContainer: {
    flex: 1,

    height: '100%',
  },
  input: {
    marginTop: 'auto',
    marginBottom: 'auto',
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
  labelSlot: {
    position: 'absolute',
  },
});
