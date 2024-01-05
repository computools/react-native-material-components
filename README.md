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
| strokeWidth | - | number | 3 |
| trackColor | - | ColorValue | - |
| indicatorColor | - | ColorValue | - |
| determinateAnimationDuration | - | number | 1000 |
| indeterminateAnimationDuration | - | number | 800 |

![circular activity indicator gif](https://ik.imagekit.io/Computools/rn-material-components/circular-indicator-gif.gif?updatedAt=1704472978611)
</details>
<br />
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

![linear activity indicator gif](https://ik.imagekit.io/Computools/rn-material-components/linear-indicator-gif.gif?updatedAt=1704473110546)
</details>
</details>


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
