# Circular Activity Indicator

The ```Circular Activity Indicator``` is a versatile loading spinner used to indicate an ongoing process, supporting both determinate and indeterminate modes. It provides smooth animations and can be customized based on your app's design requirements.

## Component Overview

This component displays a circular activity indicator, either with a specific progress value (determinate) or as a continuously spinning spinner (indeterminate). It can be customized with different sizes, colors, and animation durations.

- **Determinate Mode**: Requires setting the progress property, which defines the exact progress value ```from 0 to 100```.

- **Indeterminate Mode**: This mode shows a continuous animation, without the need to specify the progress.

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ----|
| progress | Defines the current progress of the indicator in a determinate state (from 0 to 100). | number | - |
| size | The size of the circular indicator. Controls both the height and width of the spinner. | number | 120 |
| strokeWidth | The thickness of the indicator's stroke. It is automatically calculated as 4% of the size (i.e., 0.04 * size). | number | 0.04 of the size |
| trackColor | The color of the background track (the non-progressing portion of the circle). | ColorValue | - |
| indicatorColor | The color of the active progress indicator. | ColorValue | - |
| determinateAnimationDuration | The duration (in milliseconds) of the animation when the indicator is in a determinate state. | number | 1000 |
| indeterminateAnimationDuration | The duration (in milliseconds) of the animation when the indicator is in an indeterminate state. | number | 800 |

## Usage Example

```
import { CircularActivityIndicator } from '@computools/react-native-material-components';

<CircularActivityIndicator
  progress={50} // 50% progress
/>
```

## Visual Example

To see the component in action, check out the animation below showing both ```determinate``` and ```indeterminate``` states:

![circular activity indicator gif](https://ik.imagekit.io/Computools/rn-material-components/circular-indicator-gif.gif?updatedAt=1705066319093)


