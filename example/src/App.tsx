import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {MaterialComponentsProvider, materialTypography} from '@computools/react-native-material-components';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <MaterialComponentsProvider typography={{...materialTypography, bodyLarge: {...materialTypography.bodyLarge, fontWeight: '800'}}}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <View style={styles.container}></View>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </MaterialComponentsProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
