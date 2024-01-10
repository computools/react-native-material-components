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

You don't need extra steps to use the theme via whole app. The default theme is ***light***.

## Themes provided via the library

This library provides _dark_ and _light_ themes e.g. on iOS 13+ and Android 10+, you can get user's preferred color scheme ('dark' or 'light') with the ([Appearance API](https://reactnative.dev/docs/appearance)).

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

## Custom theme

1. Wrap the whole app in ```ThemeContainer```
2. Pass the theme prop to the ```ThemeContainer```

```
import {ThemeContainer, DarkTheme, type Theme} from '@computools/react-native-material-components';

const CustomTheme: Theme = {...DarkTheme, primary: {...DarkTheme.primary, main: '#F8F8F8'}};

export default function App() {
  return (
    <ThemeContainer theme={CustomTheme}>
      {/* Rest of your app code */}
    </ThemeContainer>
  );
}
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


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
