# @computools/react-native-material-components

Computools react native material components package

## Installation

1. ```yarn add @computools/react-native-material-components```

2. ```yarn add react-native-reanimated```

3. Add ```react-native-reanimated/plugin``` plugin to your babel.config.js.

_react-native-reanimated/plugin has to be listed last._

See the [documentation](https://docs.swmansion.com/react-native-reanimated/) to learn more info about react-native-reanimated

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


## Custom theme

**You need to wrap whole app in ```ThemeContainer```**

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
    <ThemeContainer theme={themes.lightTheme}>
     {/* Rest of your app code */}
    </ThemeContainer>
  );
}
```

Also, you can create a custom theme manually and pass it as a property to the ThemeContainer component. (hint: Check Theme interface provided by the library)

## Themes provided via the library

This library provides _dark_ and _light_ themes e.g. on iOS 13+ and Android 10+, you can get user's preferred color scheme ('dark' or 'light') with the ([Appearance API](https://reactnative.dev/docs/appearance)).

**You need to wrap whole app in ```ThemeContainer```**

```
import {useColorScheme} from 'react-native';
import {ThemeContainer, DarkTheme, LightTheme} from '@computools/react-native-material-components';

export default function App() {
  const scheme = useColorScheme();

  return (
    <ThemeContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      {/* Rest of your app code */}
    </ThemeContainer>
  );
};
```

## Using the current theme in your own components

To gain access to the theme in any component you can use the useTheme hook. It returns the theme object:

```
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@computools/react-native-material-components';

export const MySubmitButton() => {
  const {primary} = useTheme();

  return (
    <TouchableOpacity style={{backgroundColor: primary.container}}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}
```
</details>
<details><summary>Divider</summary>
<br />
**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| horizontal | - | boolean | true |

![divider](https://ik.imagekit.io/Computools/rn-material-components/divider.png?updatedAt=1705067870577)
</details>
<details><summary>Controls</summary>
<br />
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
| animationDuration | - | number | 220 |

![switch](https://ik.imagekit.io/Computools/rn-material-components/switch.png?updatedAt=1704380348816)
![switch gif](https://ik.imagekit.io/Computools/rn-material-components/switch-gif.gif?updatedAt=1704382949514)
</details>

<details><summary>Radio Button</summary>
<br />

**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ----|
| value | required | T | - |
| checked | required | boolean | - |
| onCheck | required | (value: T) => void | - |
| size | - | number | 28 |
| labelEnd | - | ReactNode | - |
| labelStart | - | ReactNode | - |
| animationDuration | - | number | 150 |
| indicatorStyle | - | ViewStyle | - |
| radioButtonStyle | - | ViewStyle | - |
| indicatorColor | - | ColorValue | - |
| radioButtonBorderColor | - | ColorValue | - |
| radioButtonBackgroundColor | - | ColorValue | - |
| checkedRadioButtonBorderColor | - | ColorValue | - |
| checkedRadioButtonBeckgroundColor | - | ColorValue | - |

![radio button](https://ik.imagekit.io/Computools/rn-material-components/radio-button.png?updatedAt=1704380348933)
![radio button gif](https://ik.imagekit.io/Computools/rn-material-components/radio-button-gif.gif?updatedAt=1704382857149)
</details>

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
| checkboxBorderColor | - | ColorValue | - |
| checkboxBackgroundColor | - | ColorValue | - |
| checkedCheckboxBorderColor | - | ColorValue | - |
| checkedCheckboxBackgroundColor | - | ColorValue | - |
| size | - | number | 28 |
| checkboxStyle | - | ViewStyle | - |

![checkbox](https://ik.imagekit.io/Computools/rn-material-components/checkbox.png?updatedAt=1704380348884)
![checkbox gif](https://ik.imagekit.io/Computools/rn-material-components/checkbox-gif.gif?updatedAt=1704382741915)
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
