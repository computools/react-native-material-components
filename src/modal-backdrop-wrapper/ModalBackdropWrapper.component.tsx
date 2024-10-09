import {
  Modal,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type ModalProps,
  TouchableWithoutFeedback,
  type GestureResponderEvent,
} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {interpolate, useAnimatedStyle, type SharedValue} from 'react-native-reanimated';

import {useTheme} from '../theme/useTheme.hook';
import {styles} from './modal-backdrop-wrapper.styles';

export interface Props extends ModalProps {
  visibility: SharedValue<number>;

  contentWrapperStyle?: StyleProp<ViewStyle>;
}

export const ModalBackdropWrapper: React.FC<Props> = ({visibility, contentWrapperStyle, children, onRequestClose, ...props}) => {
  const {scrim} = useTheme();

  const handlePressModalContent = useCallback((e: GestureResponderEvent) => {
    e.stopPropagation();
  }, []);

  const backdropAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(visibility.value, [0, 1], [0, 0.32]),
    }),
    []
  );

  return (
    <Modal transparent supportedOrientations={['landscape', 'portrait']} {...props}>
      <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor: scrim}, backdropAnimatedStyle]} />
      <Pressable style={[styles.contentWrapperStyle, contentWrapperStyle]} onPress={onRequestClose}>
        <TouchableWithoutFeedback onPress={handlePressModalContent}>{children}</TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};
