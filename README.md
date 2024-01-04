# @computools/react-native-material-components

Computools react native material components package

## Installation

1. ```yarn add @computools/react-native-material-components```

2. ```yarn add react-native-reanimated```

3. Add ***react-native-reanimated/plugin*** plugin to your babel.config.js.

***react-native-reanimated/plugin has to be listed last.***

See the [documentation](https://docs.swmansion.com/react-native-reanimated/) to learn more info about react-native-reanimated

# Platform specific setup

- Android

No additional steps are necessary.

- IOS

```cd ios && pod install && cd ..```

## Usage

# controls

- Switch

**Props**
**value:** boolean - **required**
**onSwitch:** (value: boolean) => void - **required**

labelEnd: ReactNode;
labelStart: ReactNode;
handleIcon: ReactNode;

hideIconOnSwitchOff: boolean; - _default true_

handleActiveBorderColor: ColorValue;
handleInactiveBorderColor: ColorValue;
handleActiveBackgroundColor: ColorValue;
handleInactiveBackgroundColor: ColorValue;

trackActiveBorderColor: ColorValue;
trackInactiveBorderColor: ColorValue;
trackActiveBackgroundColor: ColorValue;
trackInactiveBackgroundColor: ColorValue;

style: ViewStyle;
hanldeStyle: ViewStyle;
animationDuration: number; - _default 220 ms_

![switch](https://ik.imagekit.io/Computools/rn-material-components/switch.png?updatedAt=1704380348816)

- Radio Button

***Props***

**value:** T - **required**
**checked:** boolean; - **required**
**onCheck:** (value: T) => void; - **required**

size: number; - _default 28_
labelEnd: ReactNode;
labelStart: ReactNode;
animationDuration: number; - _default 150 ms_

indicatorStyle: StyleProp<ViewStyle>;
radioButtonStyle: StyleProp<ViewStyle>;

indicatorColor: ColorValue;
radioButtonBorderColor: ColorValue;
radioButtonBackgroundColor: ColorValue;
checkedRadioButtonBorderColor: ColorValue;
checkedRadioButtonBeckgroundColor: ColorValue;

![radio button](https://ik.imagekit.io/Computools/rn-material-components/radio-button.png?updatedAt=1704380348933)

- Checkbox

***Props***

**value:** T; - **required**
**checked:** boolean; - **required**
**onCheck:** (value: T) => void; - **required**

labelEnd: ReactNode;
labelStart: ReactNode;
checkedIcon: ReactNode;

checkboxBorderColor: ColorValue;
checkboxBackgroundColor: ColorValue;
checkedCheckboxBorderColor: ColorValue;
checkedCheckboxBackgroundColor: ColorValue;

size: number; - _default 28_
checkboxStyle: StyleProp<ViewStyle>;

![checkbox](https://ik.imagekit.io/Computools/rn-material-components/checkbox.png?updatedAt=1704380348884)


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
