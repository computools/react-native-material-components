# Switch

## Overview

Switches toggle between two states, typically representing on and off.

![switch gif](https://ik.imagekit.io/Computools/rn-material-components/switch.gif?updatedAt=1705397969649)

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| value | Required. Current state of the switch. | boolean | - |
| onSwitch | Required. Callback when the state changes. | (value: boolean) => void | - |
| labelEnd | Content displayed at the end of the label. | ReactNode | - |
| labelStart | Content displayed at the start of the label. | ReactNode | - |
| handleIcon | Icon for the handle. | ReactNode | - |
| hideIconOnSwitchOff | Hides the icon when the switch is off. | boolean | true |
| handleActiveBorderColor | Border color when the handle is active. | ColorValue | - |
| handleInactiveBorderColor | Border color when the handle is inactive. | ColorValue | - |
| handleActiveBackgroundColor | Background color when the handle is active. | ColorValue | - |
| handleInactiveBackgroundColor | Background color when the handle is inactive. | ColorValue | - |
| trackActiveBorderColor | Border color when the track is active. | ColorValue | - |
| trackInactiveBorderColor | Border color when the track is inactive. | ColorValue | - |
| trackActiveBackgroundColor | Background color when the track is active. | ColorValue | - |
| trackInactiveBackgroundColor | Background color when the track is inactive. | ColorValue | - |
| style | Custom styles for the switch container. | ViewStyle | - |
| hanldeStyle | Custom styles for the handle. | ViewStyle | - |
| trackStyle | Custom styles for the track. | ViewStyle | - |
| animationDuration | Duration of the toggle animation in milliseconds. | number | 220 |

