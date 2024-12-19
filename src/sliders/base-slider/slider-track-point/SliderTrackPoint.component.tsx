import React from 'react';
import {Pressable, type PressableProps, type StyleProp, type ViewStyle} from 'react-native';

import {styles} from './slider-track-point.styles';
import {useTheme} from '../../../theme/useTheme.hook';

interface SliderTrackProps extends Omit<PressableProps, 'onPress'> {
  value: number;

  style?: StyleProp<ViewStyle>;

  onPress: (value: number) => void;
}

export const SliderTrackPoint: React.FC<SliderTrackProps> = ({value, onPress, style, ...props}) => {
  const {secondaryContainer} = useTheme();

  const handleTrackPointPress = () => onPress(value);

  return (
    <Pressable
      hitSlop={16}
      onPress={handleTrackPointPress}
      style={[styles.trackPoint, {backgroundColor: secondaryContainer.text}, style]}
      {...props}
    />
  );
};
