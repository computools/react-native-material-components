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

**Props**

- **value:** _boolean_ - **required**
- **onSwitch:** _(value: boolean) => void_ - **required**

- labelEnd: _ReactNode_
- labelStart: ReactNode
- handleIcon: _ReactNode_

- hideIconOnSwitchOff: _boolean_ - **_default true_**

- handleActiveBorderColor: _ColorValue_
- handleInactiveBorderColor: _ColorValue_
- handleActiveBackgroundColor: _ColorValue_
- handleInactiveBackgroundColor: _ColorValue_
- trackActiveBorderColor: _ColorValue_
- trackInactiveBorderColor: _ColorValue_
- trackActiveBackgroundColor: _ColorValue_
- trackInactiveBackgroundColor: _ColorValue_

- style: _ViewStyle_
- hanldeStyle: _ViewStyle_
- animationDuration: _number_ - **_default 220 ms_**


![switch](https://ik.imagekit.io/Computools/rn-material-components/switch.png?updatedAt=1704380348816)
![switch gif](https://ik.imagekit.io/Computools/rn-material-components/switch-gif.gif?updatedAt=1704382949514)
</details>

<details><summary>Radio Button</summary>
<br />

***Props***

- **value:** _T_ - **required**
- **checked:** _boolean_ - **required**
- **onCheck:** _(value: T) => void_ - **required**

- size: _number_ - **_default 28_**
- labelEnd: _ReactNode_
- labelStart: _ReactNode_
- animationDuration: _number_ - **_default 150 ms_**

- indicatorStyle: _StyleProp<ViewStyle>_
- radioButtonStyle: _StyleProp<ViewStyle>_

- indicatorColor: _ColorValue_
- radioButtonBorderColor: _ColorValue_
- radioButtonBackgroundColor: _ColorValue_
- checkedRadioButtonBorderColor: _ColorValue_
- checkedRadioButtonBeckgroundColor: _ColorValue_


![radio button](https://ik.imagekit.io/Computools/rn-material-components/radio-button.png?updatedAt=1704380348933)
![radio button gif](https://ik.imagekit.io/Computools/rn-material-components/radio-button-gif.gif?updatedAt=1704382857149)
</details>

<details><summary>Checkbox</summary>
<br />

***Props***

- **value:** _T_ - **required**
- **checked:** _boolean_ - **required**
- **onCheck:** _(value: T) => void_ - **required**

- labelEnd: _ReactNode_
- labelStart: _ReactNode_
- checkedIcon: _ReactNode_

- checkboxBorderColor: _ColorValue_
- checkboxBackgroundColor: _ColorValue_
- checkedCheckboxBorderColor: _ColorValue_
- checkedCheckboxBackgroundColor: _ColorValue_

- size: number - _**_default 28_**_
- checkboxStyle: _StyleProp<ViewStyle>_


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
