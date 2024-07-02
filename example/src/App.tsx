import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {MaterialComponentsProvider} from '@computools/react-native-material-components';

export default function App() {
  return (
    <MaterialComponentsProvider>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
          <View />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </MaterialComponentsProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
