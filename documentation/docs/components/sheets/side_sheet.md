# Side Sheet

## Overview

The ```Side Sheet``` component is a customizable, animated sheet that slides in from the left or right side of the screen. It is designed for displaying additional content or actions while keeping the primary content visible. Usually useds for meny, filters ets.

<img src="https://ik.imagekit.io/Computools/rn-material-components/left-side-sheet.gif?updatedAt=1706170982231" style="height: 700px;" alt="left side sheet" />
<br />
<img src="https://ik.imagekit.io/Computools/rn-material-components/right-side-sheet.gif?updatedAt=1706171192408" style="height: 700px;" alt="bright side sheet" />

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| children | Content to be displayed inside the Side Sheet. | ReactNode | - |
| stickySide | Determines the side of the screen where the Side Sheet will appear. | 'right' or 'left | 'right' |
| modalWidthCoeff | A coefficient (0 to 1) to control the width of the Side Sheet relative to the screen width. | number | 0.85 |
| animationDuration | Duration of the opening and closing animation in milliseconds. | number | 300 |
| backdropStyle | Custom styles for the backdrop (the semi-transparent background behind the Side Sheet). | ViewStyle | - |

## API Methods

The ```SideSheetRef``` interface provides the following methods:

| name | description |
| ------ | ------ |
| toggle() | Toggles the visibility of the bottom sheet. |


## Usage

1. Create a ```ref``` for a side sheet of the ```SideSheetRef``` interface.
2. Pass the side sheet ```ref``` as ref prop to ```SideSheet```.
3. Call ```toggle()``` method from ref.current to open/close the Side Sheet.

**Code example:**
```typescript
import {SideSheet, type SideSheetRef} from '@computools/react-native-material-components';

export const MyScreen = () => {
  const sideSheetRef = React.useRef<SideSheetRef>(null);

  const toggleSideSheet = () => sideSheetRef.current?.toggle();

  return (
    <>
      <View style={styles.container}>
        <Text onPress={toggleSideSheet}>TOGGLE SIDE SHEET</Text>
      </View>
      <SideSheet ref={sideSheetRef}>
        {/* Side sheet content here */}
      </SideSheet>
    </>
  );
};
```

**Important**: If you want to use ```scrollable components as children``` of Side Sheet, you need to import them from ```react-native-gesture-handler```. Otherwise, they won't scroll on Android devices.






