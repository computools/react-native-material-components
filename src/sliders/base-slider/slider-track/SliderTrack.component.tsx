import {type ViewProps} from 'react-native';
import React, {type PropsWithChildren} from 'react';

import {styles} from './slider-track.styles';
import Animated, {type AnimatedProps} from 'react-native-reanimated';

export const SliderTrack: React.FC<PropsWithChildren<AnimatedProps<ViewProps>>> = ({children, style, ...props}) => (
  <Animated.View style={[styles.track, style]} {...props}>
    {children}
  </Animated.View>
);
