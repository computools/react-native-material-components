# @computools/react-native-material-components

Computools react native material components package

## Installation

1. ```yarn add @computools/react-native-material-components```

2. Add required dependency packages
```
yarn add react-native-reanimated
yarn add react-native-gesture-handler
yarn add react-native-safe-area-context
yarn add react-native-svg
```

3. Add ```react-native-reanimated/plugin``` plugin to your babel.config.js.

_react-native-reanimated/plugin has to be listed last._

See the [documentation](https://docs.swmansion.com/react-native-reanimated/) to learn more info about react-native-reanimated

4. Wrap whole App in ```SafeAreaProvider``` and ```GestureHandlerRootView``` containers.

See the example:

```
export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* Rest of your app code */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
```

# Platform specific setup

- Android

No additional steps are necessary.

- IOS

```cd ios && pod install && cd ..```

## Usage
<details><summary>Theme</summary>
<br />

## Basic usage

You don't need extra steps to use the default theme via whole app. The default theme is ***light***.


## Custom Theme

**You need to wrap whole app in ```MaterialComponentsProvider```**

This library provides an opportunity to automatically create themes from target colors. ```buildThemesFromColors``` function takes theme colors and returns light and dark themes.
Each theme color must be one of the next color formats: hex, rgb or rgba.

_See the example:_
```
import {buildThemesFromColors, type ThemeColors} from '@computools/react-native-material-components';

export const themeColors: ThemeColors = {
  primary: '#2e5242',
  secondary: '#e28f00',
  tertiary: '#cb7375',
  error: '#E4122B',
  neutral: '#d7a0a6',
  neutralVariant: '#ecece8',
};

const themes = buildThemesFromColors(themeColors);

export default function App() {
  return (
    <MaterialComponentsProvider theme={themes.lightTheme}>
     {/* Rest of your app code */}
    </MaterialComponentsProvider>
  );
}
```

Also, you can create a custom theme manually and pass it as a property to the MaterialComponentsProvider component. (hint: Check Theme interface provided by the library)

## Themes provided via the library

This library provides _dark_ and _light_ themes e.g. on iOS 13+ and Android 10+, you can get user's preferred color scheme ('dark' or 'light') with the ([Appearance API](https://reactnative.dev/docs/appearance)).

**You need to wrap whole app in ```MaterialComponentsProvider```**

```
import {useColorScheme} from 'react-native';
import {MaterialComponentsProvider, DarkTheme, LightTheme} from '@computools/react-native-material-components';

export default function App() {
  const scheme = useColorScheme();

  return (
    <MaterialComponentsProvider theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      {/* Rest of your app code */}
    </MaterialComponentsProvider>
  );
};
```

## Using the current Theme in your own components

To gain access to the theme in any component you can use the useTheme hook. It returns the theme object:

```
import React from 'react';
import {TouchableOpacity, Text, TouchableOpacityProps} from 'react-native';
import {useTheme} from '@computools/react-native-material-components';

export const MySubmitButton: React.FC<TouchableOpacityProps> = ({style, ...props}) => {
  const {primary} = useTheme();

  return (
    <TouchableOpacity style={[{backgroundColor: primary.container}, style]} {...props}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}
```
</details>
<details><summary>Typography</summary>

## Basic usage

You don't need extra steps to use the default typography via whole app. The default font is Roboto for Android and san Francisco for IOS.

## Custom Typography

**You need to wrap whole app in ```MaterialComponentsProvider```**

You can create a custom typography styles and pass it as a typography property to the MaterialComponentsProvider component.

_See the example:_
```
import {MaterialComponentsProvider, materialTypography, MaterialTypography} from '@computools/react-native-material-components';

const typographyStyles: MaterialTypography = {...materialTypography, bodyMedium: {...materialTypography.bodyMedium, fontFamily: 'Montserrat-Medium'}}

export default function App() {
  return (
    <MaterialComponentsProvider typography={typographyStyles}>
     {/* Rest of your app code */}
    </MaterialComponentsProvider>
  );
}
```

## Using the current Typography in your own components

To gain access to the typography in any component you can use the useTypography hook. It returns the material typography styles object:

```
import React, {PropsWithChildren} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useTypography} from '@computools/react-native-material-components';

export const AppBodyLargeText: React.FC<PropsWithChildren> = ({children}) => {
  const {bodyLarge} = useTypography();

  return <Text style={bodyLarge}>{children}</Text>;
}
```
</deatils>
</details>
<details><summary>Components</summary>
<br />
<details><summary>Activity Indicators</summary>
<br />
<details><summary>Circular Activity Indicator</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| progress | set up progress if you want to determinate the indicator (from 0 to 100) | number | - |
| size | - | number | 120 |
| strokeWidth | - | number | 0.04 of the size |
| trackColor | - | ColorValue | - |
| indicatorColor | - | ColorValue | - |
| determinateAnimationDuration | - | number | 1000 |
| indeterminateAnimationDuration | - | number | 800 |

![circular activity indicator gif](https://ik.imagekit.io/Computools/rn-material-components/circular-indicator-gif.gif?updatedAt=1705066319093)
</details>
<details><summary>Linear Activity Indicator</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| progress | set up progress if you want to determinate the indicator (from 0 to 100) | number | - |
| trackHeight | - | number | 4 |
| indicatorWidthCoeff | from 0 to 1 | number | 0.7 |
| trackColor | - | ColorValue | - |
| indicatorColor | - | ColorValue | - |
| determinateAnimationDuration | - | number | 1000 |
| indeterminateAnimationDuration | - | number | 1500 |

![linear activity indicator gif](https://ik.imagekit.io/Computools/rn-material-components/linear-indicator-gif.gif?updatedAt=1705066319092)
</details>
</details>
<details><summary>Buttons</summary>
<br />
<details><summary>Common buttons</summary>
<br />

**Components**

- ```TextButton```
- ```FilledButton```
- ```OutlinedButton```
- ```ElevatedButton```
- ```TonalButton```

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| title | required | string | - |
| StartIcon | - | React.FC<T> | - |
| EndIcon | - | React.FC<T> | - |
| iconProps | - | T | - |
| titleStyle | - | StyleProp<TextStyle | - |

![common buttons](https://ik.imagekit.io/Computools/rn-material-components/common_buttons.png?updatedAt=1730123562488)
</details>
<details><summary>Icon buttons</summary>
<br />

**Components**

- ```StandartIconButton```
- ```FilledIconButton```
- ```OutlinedIconButton```
- ```TonalIconButton```

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| Icon | required | React.FC<T> | - |
| size | - | number | - |
| selectedIcon | - | React.FC<T> | - |
| selected | - | boolean | false |
| iconProps | - | T | - |

![icon buttons](https://ik.imagekit.io/Computools/rn-material-components/icon_buttons.png?updatedAt=1730123727799)
</details>
<details><summary>Floatin action button</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| type | PRIMARY, SECONDARY, TERTIARY, SURRFACE | FloatingActionButtonType | PRIMARY |
| label | - | string | - |
| extended | Enables control over label visibility with animation. If set to true, the label remains constantly visible; otherwise, it appears or hides with an animation based on specific conditions | true | - |
| size | SMALL, BIG | FloatingActionButtonSize | SMALL |
| iconProps | - | T | - |
| Icon | - | React.FC<T> | - |
| labelStyle | - | StyleProp<TextStyle> | - |

![fab](https://ik.imagekit.io/Computools/rn-material-components/fab.gif?updatedAt=1730123868550)
</details>
<details><summary>Segmented button</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| segments | required |  ButtonSegment<T, U>[] | - |
| selected | required | T[] | - |
| onSegmentPress | required |(value: T[] | ((currValues: T[]) => T[])) => void | - |
| disabled | - | boolean | false |
| multiSelectionEnabled | - | boolean | false |
| withCheckmark |  Enables control over checkmark visibility with selected segment. | boolean | true |
| iconSize | - | number | 18 |
| iconColor | - | ColorValue | - |
| iconColor | - | ColorValue | - |
| rippleColor | - | ColorValue | - |
| labelStyle | - | StyleProp<TextStyle> | - |

![segmented buttons](https://ik.imagekit.io/Computools/rn-material-components/segmented_button_single.gif?updatedAt=1730123815131)
</details>
</details>
<details><summary>Cards</summary>
<br />
<details><summary>Filled Card</summary>
<br />

Filled card is non-touchable.
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| children | - | ReactNode | - |

![card](https://ik.imagekit.io/Computools/rn-material-components/filled-card.png?updatedAt=1705074211963)
</details>

<details><summary>Outlined Card</summary>
<br />

Outlined card is non-touchable.
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| children | - | ReactNode | - |

![outlined card](https://ik.imagekit.io/Computools/rn-material-components/outlined-card.png?updatedAt=1705074212036)
</details>

<details><summary>Elevated Card</summary>
<br />

Outlined card is touchable.
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| children | - | ReactNode | - |

![card](https://ik.imagekit.io/Computools/rn-material-components/elevated-card.png?updatedAt=1705074211931)
</details>
</details>
<details><summary>Controls</summary>
<br />

<details><summary>Checkbox</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| value | required | T | - |
| checked | required | boolean | - |
| onCheck | required | (value: T) => void | - |
| labelEnd | - | ReactNode | - |
| labelStart | - | ReactNode | - |
| checkedIcon | - | ReactNode | - |
| size | - | number | 28 |
| checkboxStyle | - | ViewStyle | - |
| errorColor | - | ColorValue | - |
| borderColor | - | ColorValue | - |
| checkedBorderColor | - | ColorValue | - |
| checkedBackgroundColor | - | ColorValue | - |
| errorAnimationDuration | - | number | 300 |

![checkbox gif](https://ik.imagekit.io/Computools/rn-material-components/checkbox.gif?updatedAt=1705332263293)
</details>
<details><summary>Radio Button</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| value | required | T | - |
| checked | required | boolean | - |
| onCheck | required | (value: T) => void | - |
| size | - | number | 24 |
| labelEnd | - | ReactNode | - |
| labelStart | - | ReactNode | - |
| animationDuration | - | number | 150 |
| indicatorStyle | - | ViewStyle | - |
| radioButtonStyle | - | ViewStyle | - |
| radioButtonColor | - | ColorValue | - |
| checkedRadioButtonColor | - | ColorValue | - |

![radio button gif](https://ik.imagekit.io/Computools/rn-material-components/radio-button.gif?updatedAt=1705324901706)
</details>

<details><summary>Switch</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| value | required | boolean | - |
| onSwitch | required | (value: boolean) => void | - |
| labelEnd | - | ReactNode | - |
| labelStart | - | ReactNode | - |
| handleIcon | - | ReactNode | - |
| hideIconOnSwitchOff | - | boolean | true |
| handleActiveBorderColor | - | ColorValue | - |
| handleInactiveBorderColor | - | ColorValue | - |
| handleActiveBackgroundColor | - | ColorValue | - |
| handleInactiveBackgroundColor | - | ColorValue | - |
| trackActiveBorderColor | - | ColorValue | - |
| trackInactiveBorderColor | - | ColorValue | - |
| trackActiveBackgroundColor | - | ColorValue | - |
| trackInactiveBackgroundColor | - | ColorValue | - |
| style | - | ViewStyle | - |
| hanldeStyle | - | ViewStyle | - |
| trackStyle | - | ViewStyle | - |
| animationDuration | - | number | 220 |

![switch gif](https://ik.imagekit.io/Computools/rn-material-components/switch.gif?updatedAt=1705397969649)
</details>
</details>

<details><summary>Dialogs</summary>
<br />
<details><summary>Dialog</summary>
<br />

Wrapper component used in ```BasicDialog```. This library proides the opportunity to use ```Dialog``` to implement custom components.

**Methods**

| name | parameters | returns |
| ------ | ------ | ------ |
| show | none | void |
| close | none | void |
| isShowed | none | boolean |

_See the example how to use:_
```
import {Dialog, type DialogRef} from '@computools/react-native-material-components';

export const YourComponent = () => {
  const dialogRef = useRef<DialogRef>(null);

  return (
    {/* Rest of your app code */}
    <Button onPress={() => dialogRef.current.show()} />
    <Dialog ref={dialogRef}>
      <YourDialogContent />
    </Dialog>
     {/* Rest of your app code */}
  );
}
```

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| animationDuration | appearance/disappearance animation duration | number | 220 |

</details>
<details><summary>Basic Dialog</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| title | - | string | - |
| subtitle | - | string | - |
| firstActionTitle | - | string | - |
| secondActionTitle | - | string | - |
| onFirstActionPress | - | () | () => void |
| onSecondActionPress | - | () => void | - |
| titleStyle | - | TextStyle | - |
| subtitleStyle | - | TextStyle | - |
| prepend | - | ReactNde | - |
| append | - | ReactNde | - |

![basic dialog gif](https://ik.imagekit.io/Computools/rn-material-components/basic-dialog.gif?updatedAt=1729261989459)
</details>
<details><summary>Full screen Dialog</summary>
<br />

**Properties**
  animationDuration?: number;
  animationType?: AnimationType;

| name | description | type | default |
| ------ | ------ | ------ | ----|
| animationType | - | AnimationType | AnimationType.SLIDE |
| animationDuration | - | number | 330 |

![full screen dialog gif](https://ik.imagekit.io/Computools/rn-material-components/full-screen-dialog.gif?updatedAt=1729261989519)
</details>

<details><summary>Troubleshooting</summary>
<br />

## Modal unexpectedly reappear

In some cases, a modal may unexpectedly reappear after being closed, especially when certain actions like navigation functions are triggered during or immediately after the modal's closure. This happens because the UI thread can be busy handling other interactions (e.g., button presses, transitions), leading to a race condition where the modal is shown again.

To prevent this, you can use ```InteractionManager.runAfterInteractions```. This ensures that your actions (like navigation) are executed only after all ongoing interactions are finished, providing a smoother and more predictable user experience.


_See the example how to use:_
```
const onSubmitPress = async () => {
  const isSuccessfullySignedOut = await signOut();

  if (isSuccessfullySignedOut) {
    InteractionManager.runAfterInteractions(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: MainStackRoutes.Welcome}],
        }),
      );
  });
}

}
```
</details>
</details>
<details><summary>Divider</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| horizontal | - | boolean | true |

![divider](https://ik.imagekit.io/Computools/rn-material-components/divider.png?updatedAt=1705067870577)
</details>
<details><summary>Sheets</summary>
<br />
<details><summary>Bottom Sheet</summary>

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| header | | ReactNode | - |
| children | - | ReactNode | - |
| modalHeightCoeff | - | number | 0.4 |
| animationDuration | - | number | 300 |
| headerStyle | - | ViewStyle | - |
| backdropStyle | - | ViewStyle | - |
| dragHandleStyle | - | ViewStyle | - |

### Usage

1. Create a ref for a bottom sheet of the BottomSheetRef interface.
2. Pass the bottom sheet ref as ref prop to ```BottomSheet```.
3. Call ```toggle()``` method from ```ref.current``` to open/close the Bottom Sheet or ```expand()``` to expand the Bottom Sheet completely.

See the example:

```
import {BottomSheet, type BottomSheetRef} from '@computools/react-native-material-components';

export const MyScreen = () => {
  const bottomSheetRef = React.useRef<BottomSheetRef>(null);

  const toggleBottomSheet = () => ref.current?.toggle();

  return (
    <>
      <View style={styles.container}>
        <Text onPress={toggleBottomSheet}>TOGGLE BOTTOM SHEET</Text>
      </View>
      <BottomSheet ref={ref}>
        {/* Bottom sheet content here */}
      </BottomSheet>
    </>
  );
}
```

**Note:** If you want to use scrollable components as children of Bottom Sheet you need to import them from react-native-gesture-handler. Otherwise they won't scroll on Android.

![left side sheet](https://ik.imagekit.io/Computools/rn-material-components/left-side-sheet.gif?updatedAt=1706170982231)
</details>
<details><summary>Side Sheet</summary>

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| children | - | ReactNode | - |
| stickySide | - | 'right' or 'left | 'right' |
| modalWidthCoeff | up to 1 | number | 0.85 |
| animationDuration | - | number | 300 |
| backdropStyle | - | ViewStyle | - |

### Usage

1. Create a ref for a side sheet of the SideSheetRef interface.
2. Pass the side sheet ref as ref prop to ```SideSheet```.
3. Call ```toggle()``` method from ```ref.current``` to open/close the Side Sheet.

See the example:

```
import {SideSheet, type SideSheetRef} from '@computools/react-native-material-components';

export const MyScreen = () => {
  const sideSheetRef = React.useRef<SideSheetRef>(null);

  const toggleSideSheet = () => ref.current?.toggle();

  return (
    <>
      <View style={styles.container}>
        <Text onPress={toggleSideSheet}>TOGGLE SIDE SHEET</Text>
      </View>
      <SideSheet ref={ref}>
        {/* Side sheet content here */}
      </SideSheet>
    </>
  );
}
```

**Note:** If you want to use scrollable components as children of Side Sheet you need to import them from react-native-gesture-handler. Otherwise they won't scroll on Android.

![left side sheet](https://ik.imagekit.io/Computools/rn-material-components/left-side-sheet.gif?updatedAt=1706170982231)
![right side sheet](https://ik.imagekit.io/Computools/rn-material-components/right-side-sheet.gif?updatedAt=1706171192408)
</details>
</details>
<details><summary>Snackbar</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| content | Required. Snackbar supporting text | string | - |
| action | Title for action button | string | - |
| offset | Distance to the bottom | number | 64 |
| duration | - | number | 2000 |
| showCloseIcon | - | boolean | false |
| closeIconSize | - | number | 20 |
| closeIconColor | - | ColorValue | - |
| animationDuration | - | number | 500 |
| actionStyle | - | TextStyle | - |
| contentStyle | - | TextStyle | - |
| onActionPress | - | () => void | - |

![snackbar](https://ik.imagekit.io/Computools/rn-material-components/snackbar.png?updatedAt=1704887400534)
![snackbar with icon](https://ik.imagekit.io/Computools/rn-material-components/snackbar-with-icon.png?updatedAt=1704887400512)
![snackbar gif](https://ik.imagekit.io/Computools/rn-material-components/snackbar-gif.gif?updatedAt=1704887530020)
</details>
</deatils>

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
