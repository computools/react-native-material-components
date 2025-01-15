# Linear Activity Indicator

## Overview

The ```Linear Activity Indicator``` is a progress indicator that can be used in both determinate and indeterminate modes, in a horizontal, linear style.

![linear activity indicator gif](https://ik.imagekit.io/Computools/rn-material-components/linear-indicator-gif.gif?updatedAt=1705066319092)

## Component Overview

The ```Linear Activity Indicator``` is used to show progress in a linear format. It's commonly used for tasks like loading screens or to indicate that a process is taking place. The indicator can be set to a determinate mode, where progress or to an indeterminate mode.

- **Determinate Mode**: Requires setting the progress property, which defines the exact progress value ```from 0 to 100```.

- **Indeterminate Mode**: This mode shows a continuous animation, without the need to specify the progress.

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ----|
| progress | Set up progress if you want to determine the indicator (0 to 100) | number | - |
| trackHeight | Height of the track | number | 4 |
| indicatorWidthCoeff | Width coefficient for the indicator, from 0 to 1 | number | 0.7 |
| trackColor | Color of the track (background) | ColorValue | - |
| indicatorColor | Color of the indicator (active progress) | ColorValue | - |
| determinateAnimationDuration | Duration of animation for determinate mode (ms) | number | 1000 |
| indeterminateAnimationDuration | Duration of animation for indeterminate mode (ms) | number | 1500 |

## Usage Example

```typescript
import { LinearActivityIndicator } from '@computools/react-native-material-components';

<LinearActivityIndicator
  progress={50} // 50% progress
/>
```
