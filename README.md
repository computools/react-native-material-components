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

*** Props ***
value: boolean - required
onSwitch: (value: boolean) => void - required

labelEnd: ReactNode;
labelStart: ReactNode;
handleIcon: ReactNode;

hideIconOnSwitchOff: boolean; - default true

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
animationDuration?: number; - default 220 ms

- Radio Button

*** Props ***

value: T - required
checked: boolean; - required
onCheck: (value: T) => void; - required

size?: number; - default 28
labelEnd?: ReactNode;
labelStart?: ReactNode;
animationDuration?: number; - default 150 ms

indicatorStyle?: StyleProp<ViewStyle>;
radioButtonStyle?: StyleProp<ViewStyle>;

indicatorColor?: ColorValue;
radioButtonBorderColor?: ColorValue;
radioButtonBackgroundColor?: ColorValue;
checkedRadioButtonBorderColor?: ColorValue;
checkedRadioButtonBeckgroundColor?: ColorValue;

- Checkbox

*** Props ***

value: T; - required
checked: boolean; - required

labelEnd?: ReactNode;
labelStart?: ReactNode;
checkedIcon?: ReactNode;

checkboxBorderColor?: ColorValue;
checkboxBackgroundColor?: ColorValue;
checkedCheckboxBorderColor?: ColorValue;
checkedCheckboxBackgroundColor?: ColorValue;

size?: number; - default 28
checkboxStyle?: StyleProp<ViewStyle>;

onCheck: (value: T) => void;


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
