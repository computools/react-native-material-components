# Bottom Sheet

## Overview

The ```Bottom Sheet``` component provides a versatile and animated modal-like interface that slides up from the bottom of the screen. Component's content should be additional or secondary.

<img src="https://ik.imagekit.io/Computools/rn-material-components/bottom-sheet.gif?updatedAt=1736521035362" style="height: 700px;" alt="bottom sheet" />

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| header | Content to display in the header section. | ReactNode | - |
| children | Content to display within the bottom sheet. | ReactNode | - |
| modalHeightCoeff | Determines the height of the modal as a fraction of the screen height. | number | 0.4 |
| animationDuration | Duration of the opening/closing animation (ms). | number | 300 |
| headerStyle | Style for the header section. | ViewStyle | - |
| backdropStyle | Style for the backdrop. | ViewStyle | - |
| dragHandleStyle | Style for the drag handle. | ViewStyle | - |

## API Methods

The ```BottomSheetRef``` interface provides the following methods:

| name | description |
| ------ | ------ |
| toggle() | Toggles the visibility of the bottom sheet. |
| expand() | Expands the bottom sheet to its maximum height. |

## Usage

1. Create a ```ref``` for the bottom sheet using the ```BottomSheetRef``` interface.
2. Pass the ```ref``` as a prop to the ```BottomSheet``` component.
3. Use the ```toggle()``` method from ```ref.current``` to open or close the bottom sheet, or use the ```expand()``` method to fully expand it.

**Code example:**
```
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheet, type BottomSheetRef } from '@computools/react-native-material-components';

export const MyScreen = () => {
  const bottomSheetRef = React.useRef<BottomSheetRef>(null);

  const toggleBottomSheet = () => bottomSheetRef.current?.toggle();

  return (
    <>
      <View style={styles.container}>
        <Text onPress={toggleBottomSheet}>TOGGLE BOTTOM SHEET</Text>
      </View>
      <BottomSheet ref={bottomSheetRef}>
        {/* Bottom sheet content here */}
        <Text>This is the content of the bottom sheet.</Text>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

**Important:** If you want to use ```scrollable components as children``` of the Bottom Sheet, ensure they are imported from ```react-native-gesture-handler```. Without this, scrolling may not function correctly on Android devices.






