import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

export const Test: React.FC = () => {
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withTiming(1, {duration: 1500});
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: anim.value,
  }));
  return (
    <Animated.View style={style}>
      <View style={styles.container} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
  },
});
