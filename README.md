# @computools/react-native-material-components

Computools react native material components package

![Material desgin Figma](https://www.figma.com/design/MY4zoWhMQUMOMIfBGcgSpy/Material-3-Design-Kit-(Community)?node-id=47909-2&p=f&t=Fo0xFwhmWhLMqS8Z-0)
![Material icons design Figma](https://www.figma.com/design/siKJo238QbcA9I2EqYMZ9y/Material-Design-Icons-(Community)?node-id=2402-2207&node-type=canvas&t=xqHD7AwdyHpKWsur-0)

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

The default font used in this library is Roboto. While no additional setup is required for Android, you will need to perform a few extra steps to configure it on iOS.

### Android

No additional steps are needed for Android. The Roboto font is bundled and ready to use.

### IOS

1. Create the ```react-native.config.js``` file

In the root of your project, create a ```react-native.config.js``` file with the following content:

```
module.exports = {
    assets: ['node_modules/react-native-material-components/ios/fonts'],
};
```

2. Run the Asset Linking Command

Run ```npx react-native-asset```

This will automatically:
- Copy the fonts into the iOS project.
- Add the fonts to the Info.plist file.

3. Rebuild the project

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
<details><summary>App Bars</summary>
<br />
<details><summary>Bottom App Bar</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| iconButtons | required | IconButtonProps[] | - |
| scrollDirection | UP or DOWN | sharedValue<ScrollDirection> | UP |
| FabIcon | Pass an icon to show FAB | React.FC | - |
| fabLabel | - | string | - |
| animationDelay | - | number | 80 |
| animationDumping | - | number | 20 |
| onFabPress | - | () => void | - |

To enable animation on scroll use ScrollView from Animated, create a shared value with a ScrollDirection value, scrollContext with a number value and manage them onScroll.

See the example:
```
export const MyComponent: React.FC = () => {
  const scrollDirection = useSharedValue(ScrollDirection.UP);
  const scrollContext = useSharedValue(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = e.nativeEvent.contentOffset.y;

    if (currentOffsetY <= 0 || currentOffsetY < scrollContext.value) {
      scrollDirection.value = ScrollDirection.UP;
    } else if (currentOffsetY >= scrollContext.value) {
      scrollDirection.value = ScrollDirection.DOWN;
    }

    scrollContext.value = currentOffsetY;
  };

  return (
    <>
      <Animated.ScrollView onScroll={onScroll}>
        <!-- scrollview content -->
      </Animated.ScrollView>
      <BottomAppBar scrollDirection={scrollDirection} />
    </>
  )
}

```

![bottom app bar](https://ik.imagekit.io/Computools/rn-material-components/bottom-app-bar.gif?updatedAt=1734086950022)

</details>
<details><summary>Top App Bars</summary>
<br />

To enable animation on scroll use ScrollView from Animated, create a shared value with ScrollStatus (0 if top is reached, 1 if target offset reached) value and manage it onScroll.

See the example:
```
export const MyComponent: React.FC = () => {
  const scrollStatus = useSharedValue(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 10) { // 10 is offset treashold when top app bar changes background color
      scrollStatus.value = 1;
    } else if (e.nativeEvent.contentOffset.y <= 10) {
      scrollStatus.value = 0;
    }
  };

  return (
    <>
      <Animated.ScrollView onScroll={onScroll}>
        <!-- scrollview content -->
      </Animated.ScrollView>
      <TopAppBar scrollStatus={scrollStatus} />
    </>
  )
}
```

![animated top app bar](https://ik.imagekit.io/Computools/rn-material-components/animated-top-app-bar.gif?updatedAt=1734088599114)

<details><summary>Center Aligned Top App Bar</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| title | required | string | - |
| StartIcon | - | React.FC | - |
| EndIcon | - | React.FC | - |
| scrollStatus | 1 - scrolled down (backgoround color will changed); 0 - non-scrolled, top is reached | SharedValue<number> | - |
| iconProps | - | T | - |
| titleStyle | - | TextStyle | - |
| defaultColor | - | ColorValue | - |
| scrolledColor | - | ColorValue | - |
| animationDuration | - | number | - |

![center aligned top app bar](https://ik.imagekit.io/Computools/rn-material-components/center_aligned_top_app_bar.png?updatedAt=1734088249862)
</details>
<details><summary>Top App Bar</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| title | required | string | - |
| size | SMALL, MEDIUM, LARGE | TopAppBarSize | - |
| StartIcon | - | React.FC | - |
| actions | - | IconButtonProps<T>[] | - |
| scrollStatus | 1 - scrolled down (backgoround color will changed); 0 - non-scrolled, top is reached | SharedValue<number> | - |
| iconProps | - | T | - |
| titleStyle | - | TextStyle | - |
| defaultColor | - | ColorValue | - |
| scrolledColor | - | ColorValue | - |
| animationDuration | - | number | - |

![small top app bar](https://ik.imagekit.io/Computools/rn-material-components/small_top_app_bar.png?updatedAt=1734088346321)
![medium top app bar](https://ik.imagekit.io/Computools/rn-material-components/medium_top_app_bar.png?updatedAt=1734088346249)
![large top app bar](https://ik.imagekit.io/Computools/rn-material-components/large_top_app_bar.png?updatedAt=1734088346230)

</details>
</details>
</details>
<details><summary>Badge</summary>
</br>

**Properties**
| name | description | type | default |
| ------ | ------ | ------ | ----|
| value | required | string | - |
| valueStyle | - | TextStyle | - |

![badge light theme](https://ik.imagekit.io/Computools/rn-material-components/badge_light.png?updatedAt=1733926687727)
![badge dark theme](https://ik.imagekit.io/Computools/rn-material-components/badge_dark.png?updatedAt=1733926687741)
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
<details><summary>Chips</summary>
<br />
<details><summary>Assist Chip</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| label | required | string | - |
| elevated | - | boolean | false |
| LeadingIcon | - | React.FC | - |
| TrailingIcon | - | React.FC | - |
| leadingIconType | COMMON, FAVICON or BRANDED | IconType | COMMON |
| trailingIconType | COMMON, FAVICON or BRANDED | IconType | COMMON |
| leadingIconProps | - | T | - |
| trailingIconProps | - | T | - |
| iconSize | - | number | 18 |
| labelStyle | - | TextStyle | - |

![assist chips](https://ik.imagekit.io/Computools/rn-material-components/assist_chip.png?updatedAt=1734450064327)

</details>
<details><summary>Filter Chip</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| label | required | string | - |
| selected | - | boolean | false |
| elevated | - | boolean | false |
| loading | Provide loading to show circle activity indicator instead of leading icon on loading | boolean |false |
| LeadingIcon | - | React.FC | - |
| TrailingIcon | - | React.FC | - |
| leadingIconProps | - | T | - |
| trailingIconProps | - | T | - |
| iconSize | - | number | 18 |
| activityIndicatorSize | - | number | 38 |

![filter chips](https://ik.imagekit.io/Computools/rn-material-components/filter_chip.png?updatedAt=1734450064378)
![filter chip loading state](https://ik.imagekit.io/Computools/rn-material-components/filter_chip_loading_state.gif?updatedAt=1734450161294)
</details>
<details><summary>Input Chip</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| label | required | string | - |
| selected | - | boolean | false |
| imageUrl | Provide a url to show leading image. | string | - |
| LeadingIcon | - | React.FC | - |
| TrailingIcon | - | React.FC | - |
| leadingIconProps | - | T | - |
| trailingIconProps | - | T | - |
| iconSize | - | number | 18 |
| hasDefaultTrailingIcon | - | boolean | true |

![input chips](https://ik.imagekit.io/Computools/rn-material-components/input_chip.png?updatedAt=1734450064308)

</details>
<details><summary>Suggestion Chip</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| label | required | string | - |
| selected | - | boolean | false |
| elevated | - | boolean | false |
| LeadingIcon | - | React.FC | - |
| TrailingIcon | - | React.FC | - |
| leadingIconProps | - | T | - |
| trailingIconProps | - | T | - |

![suggestion chips](https://ik.imagekit.io/Computools/rn-material-components/suggestion_chip.png?updatedAt=1734450064429)
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
<details><summary>Navigation</summary>
<br />
<details><summary>Nav Bar</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| routes | required | NavBarRoute<T, Y>[] | - |
| activeRouteName | required | T | - |
| onRoutePress | required | (route: T) => void | - |
| damping | - | number | 20 |
| fixedLabelVisibility | - | boolean | false |
| scrollDirection | 'UP' or 'DOWN'. Use this propert to hide/show NavBar on scroll. | ScrollDirection | - |
| containerStyle | - | ViewStyle | false |

```
export interface NavBarRoute<T, Y> {
  name: T;
  icon: React.FC<Y>;
  selectedIcon: React.FC<Y>;

  label?: string;
  badge?: string;
  showBadge?: boolean;
  badgeSize?: BadgeSize;
  iconProps?: Y;
}
```

To enable animation on scroll use ScrollView from Animated, create a shared value with a ScrollDirection value, scrollContext with a number value and manage them onScroll.

See the example:
```
export const MyComponent: React.FC = () => {
  const scrollDirection = useSharedValue(ScrollDirection.UP);
  const scrollContext = useSharedValue(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = e.nativeEvent.contentOffset.y;

    if (currentOffsetY <= 0 || currentOffsetY < scrollContext.value) {
      scrollDirection.value = ScrollDirection.UP;
    } else if (currentOffsetY >= scrollContext.value) {
      scrollDirection.value = ScrollDirection.DOWN;
    }

    scrollContext.value = currentOffsetY;
  };

  return (
    <>
      <Animated.ScrollView onScroll={onScroll}>
        <!-- scrollview content -->
      </Animated.ScrollView>
      <NavBar
        scrollDirection={scrollDirection}
        routes={routes}
        activeRouteName={activeRouteName}
        onRoutePress={setRoute}
      />
    </>
  )
}

```

![nav bar](https://ik.imagekit.io/Computools/rn-material-components/nav_bar.gif?updatedAt=1735922886681)
![anim nav bar](https://ik.imagekit.io/Computools/rn-material-components/anim_nav_bar.gif?updatedAt=1735922886792)

</details>
<details><summary>Tabs</summary>
<br />

Each Tabs accepts the required property ```tabs```, an array of the Tab interface.

```
export interface Tab<T, Y> extends Omit<TouchableOpacityProps, 'onPress'> {
  routeName: T;

  title?: string;
  icon?: React.FC<Y>;
  iconProps?: Y;
  titleStyle?: TextStyle;

  onPress: (routeName: T) => void;
}
```

<br />

To make the indicator responsive to scrolling, handle the scrollAnim state in the parent component and pass it as a prop to the Tabs component. This allows for seamless synchronization between the scrolling behavior and the indicator movement.

See the example:

```
const ParentComponent = () => {
  const {width: windowWidth} = useWindowDimensions();

  const acitveViewAnim = useSharedValue(0);
  const scrollViewRef = React.useRef<AnimatedScrollView>(null);

  const tabs: Tab[] = [<--- your tabs --->]
  const maxOutput = 1 / tabs.lenght; // The maximum output is calculated as 1 / tabsCount, where tabsCount represents the total number of tabs.

  const handleScrollToScreen1 = () => {
    acitveViewAnim.value = withTiming(0);
    scrollViewRef.current?.scrollTo({x: 0});
  };

  const handleScrollToScreen2 = () => {
    acitveViewAnim.value = withTiming(maxOutput);
    scrollViewRef.current?.scrollToEnd();
  };


  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (e) => {
        acitveViewAnim.value = interpolate(e.contentOffset.x, [0, windowWidth], [0, maxOutput]);
      },
      onEndDrag: (e) => {
        if (e.contentOffset.x > maxOutput) {
          runOnJS(handleScrollToScreen2)();
        } else {
          runOnJS(handleScrollToScreen1)();
        }
      },
    },
    [windowWidth]
  );

  return (
    <SecondaryTabs scrollAnim={acitveViewAnim} tabs={tabs}/>
    <Animated.ScrollView horizontal ref={scrollViewRef} bounces={false} showsHorizontalScrollIndicator={false} onScroll={scrollHandler}>
      <Text style={{width: windowWidth, paddingStart: 20}}>Screen 1</Text>
      <Text style={{width: windowWidth, paddingStart: 20}}>Screen 2</Text>
    </Animated.ScrollView>
  )
};
```

<details><summary>Primary Tabs</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| tabs | required | Tab<T, Y>[] | - |
| activeTab | The active tab is managed through the state. Pass the activeTab prop to enable the active tab indicator animation when scrollAnim is not provided. | T | - |
| scrollAnim | The indicator progresses from 0 to 1 / tabs.length. To make the indicator responsive to scrolling, refer to the "Tabs" section above for more details. | SharedValue<number> | - |
| badgeSize | - | SMALL or BIG | BIG |
| animConfig | - |  (routeName: T) => void | - |
| tabIconProps | - | Y | - |
| tabStyle | - | ViewStyle | - |
| badgeStyle | - | ViewStyle | - |
| indicatorStyle | - | ViewStyle | - |
| indicatorContainerStyle | - | ViewStyle | - |
| tabsContainerStyle | - | ViewStyle | - |
| tabInnerContentStyle | - | ViewStyle | - |
| tabTitleStyle | - | TextStyle | - |

![primary tabs](https://ik.imagekit.io/Computools/rn-material-components/primary_tabs.gif?updatedAt=1735922886826)
![primary tabs with badges](https://ik.imagekit.io/Computools/rn-material-components/secondary_tabs_with_badges.png?updatedAt=1735922619925)

</details>
<details><summary>Secondary Tabs</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| tabs | required | Tab<T, Y>[] | - |
| activeTab | The active tab is managed through the state. Pass the activeTab prop to enable the active tab indicator animation when scrollAnim is not provided. | T | - |
| scrollAnim | The indicator progresses from 0 to 1 / tabs.length. To make the indicator responsive to scrolling, refer to the "Tabs" section above for more details. | SharedValue<number> | - |
| badgeSize | - | SMALL or BIG | BIG |
| animConfig | - |  (routeName: T) => void | - |
| tabIconProps | - | Y | - |
| tabStyle | - | ViewStyle | - |
| badgeStyle | - | ViewStyle | - |
| indicatorStyle | - | ViewStyle | - |
| tabsContainerStyle | - | ViewStyle | - |
| tabInnerContentStyle | - | ViewStyle | - |
| tabTitleStyle | - | TextStyle | - |

![secondary tabs](https://ik.imagekit.io/Computools/rn-material-components/secondart_tabs.gif?updatedAt=1735922886638)
![secondary tabs with badges](https://ik.imagekit.io/Computools/rn-material-components/primary_tabs_with_badges.png?updatedAt=1735922619944)

</details>
</details>
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
<details><summary>Sliders</summary>
<br />
<details><summary>Slider</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| max | required | number | - |
| min | required | number | - |
| value | - | number | 0 |
| step | The slider operates in discrete mode when a step value is provided. | number | - |
| onChangeValue | - | (value: number) => void | - |
| disabled | - | boolean | false |
| centered | The slider operates in centered mode when a centered props is true | number | boolean | false |
| damping | Controls thumb animation when a track point is pressed. | number | 20 |
| valueHeight | - | number | 44 |
| thumbWidthActive | - | number | 2 |
| thumbWidthInactive | - | number | 4 |
| thumbStyle | - | ViewStyle | - |
| valueStyle | - | ViewStyle | - |
| indicatorStyle | - | ViewStyle | - |
| trackPointStyle | - | ViewStyle | - |
| trackPointsStyle | - | ViewStyle | - |
| filledTrackStyle | - | ViewStyle | - |
| remainingTrackStyle | - | ViewStyle | - |

![continuous slider](https://ik.imagekit.io/Computools/rn-material-components/continuous-slider.gif?updatedAt=1734970059184)
![centered slider](https://ik.imagekit.io/Computools/rn-material-components/centered-slider.gif?updatedAt=1734970059052)
![discrete slider](https://ik.imagekit.io/Computools/rn-material-components/discrete-slider.gif?updatedAt=1734970059069)

</details>
<details><summary>Range Slider</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| max | required | number | - |
| min | required | number | - |
| range | The first element represents the minimum value, and the second represents the maximum value. The range must have exactly two elements, with the minimum value less than or equal to the maximum value. | number | - |
| step | The slider operates in discrete mode when a step value is provided. | number | - |
| onChangeValue | - | (value: number) => void | - |
| disabled | - | boolean | false |
| centered | The slider operates in centered mode when a centered props is true | number | boolean | false |
| damping | Controls thumb animation when a track point is pressed. | number | 20 |
| valueHeight | - | number | 44 |
| thumbWidthActive | - | number | 2 |
| thumbWidthInactive | - | number | 4 |
| thumbStyle | - | ViewStyle | - |
| valueStyle | - | ViewStyle | - |
| indicatorStyle | - | ViewStyle | - |
| trackPointStyle | - | ViewStyle | - |
| trackPointsStyle | - | ViewStyle | - |
| filledTrackStyle | - | ViewStyle | - |
| remainingTrackStyle | - | ViewStyle | - |

![range slider](https://ik.imagekit.io/Computools/rn-material-components/range-slider.gif?updatedAt=1734970059452)
![discrete range slider](https://ik.imagekit.io/Computools/rn-material-components/continuous-slider.gif?updatedAt=1734970059184)

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
<details><summary>Text Inputs</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| label | Required | string | - |
| disabled | - | boolean | - |
| errorText | - | string | - |
| suportingText | - | string | - |
| leadingIcon | - | React.FC<T> | - |
| trailingIcon | - | React.FC<T> | - |
| leadingIconProps | - | T | - |
| trailingIconProps | - | T | - |
| leadingComponent | - | ReactNode | - |
| trailingComponent | - | ReactNode | - |
| labelStyle | - | ViewStyle | - |
| supportingTextStyle | - | TextStyle | - |
| innerContainerStyle | - | ViewStyle | - |
| outerContainerStyle | - | ViewStyle | - |
| activeIndicatorStyle | - | ViewStyle | - |
| onOuterContainerLayout | - | (e: LayoutChangeEvent) => void | - |

<details><summary>Filled Input</summary>
<br />

![filled text input](https://ik.imagekit.io/Computools/rn-material-components/filled_text_input.png?updatedAt=1736357640156)
![filled text input animation](https://ik.imagekit.io/Computools/rn-material-components/filled_text_input.gif?updatedAt=1736357640313)

</deatils>
<details><summary>Outlined Input</summary>
<br />

![outlined text input](https://ik.imagekit.io/Computools/rn-material-components/outlined_text_input.png?updatedAt=1736357640133)
![outlined text input animation](https://ik.imagekit.io/Computools/rn-material-components/outlined-text-input.gif?updatedAt=1736357640468)

</deatils>
</deatils>
</deatils>

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
