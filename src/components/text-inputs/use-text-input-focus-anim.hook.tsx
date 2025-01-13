import {useCallback} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {TextInput, type TextInputProps, type NativeSyntheticEvent, type TextInputFocusEventData} from 'react-native';

interface useTextInputFocusParams extends Pick<TextInputProps, 'onFocus' | 'onBlur'> {
  inputRef: React.MutableRefObject<TextInput>;
}

export const useTextInputFocus = ({inputRef, onFocus, onBlur}: useTextInputFocusParams) => {
  const focusAnim = useSharedValue(0);

  const onInputFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      focusAnim.value = withTiming(1);

      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const onInputBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      focusAnim.value = withTiming(0);

      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  const focusInput = useCallback(() => {
    if (!inputRef.current?.isFocused()) {
      inputRef.current?.focus();
    }
  }, []);

  return {
    focusAnim,
    focusAnimRange: [0, 1],

    focusInput,
    onInputBlur,
    onInputFocus,
  };
};
