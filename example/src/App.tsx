import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export default function App() {
  return <View style={styles.container} />;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
