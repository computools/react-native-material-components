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

<details><summary>Cards</summary></details>
<br />
<details><summary>Card</summary>
<br />
**Properties**

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| filled | - | boolean | true |
| elevated | - | boolean | true |
| outlined | - | boolean | true |
| children | - | ReactNode | - |
| fillColor | - | ColorValue | #ffffff |
| outlineColor | - | ColorValue | #efefef |
| elevationColor | - | ColorValue | #d1d1d1 |

![card](https://ik.imagekit.io/Computools/rn-material-components/card.png?updatedAt=1704800414329)
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
