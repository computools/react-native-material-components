# Snackbar

## Overview

The ```Snackbar``` component provides brief, informative messages to users, appearing at the bottom or top of the screen. It is ideal for communicating non-intrusive updates, such as confirming an action or showing temporary feedback.

![snackbar gif](https://ik.imagekit.io/Computools/rn-material-components/snackbar-gif.gif?updatedAt=1704887530020)

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ---- |
| content | Required. The main text displayed on the Snackbar. | string | - |
| action | Title for the action button, displayed to the right of the content. | string | - |
| offset | 	Distance from the bottom of the screen | number | 64 |
| duration | How long the Snackbar remains visible (in ms). | number | 2000 |
| showCloseIcon | Whether to display a close icon on the Snackbar. | boolean | false |
| closeIconSize | The size of the close icon. | number | 20 |
| closeIconColor | Color of the close icon. | ColorValue | - |
| animationDuration | Duration of the show/hide animation (in milliseconds). | number | 500 |
| actionStyle | Custom styles for the action button text. | TextStyle | - |
| contentStyle | Custom styles for the content text. | TextStyle | - |
| onActionPress | Callback function triggered when the action button is pressed. | () => void | - |

## API Methods

The ```SnackbarRef``` interface provides the following methods:

| name | description |
| ------ | ------ |
| show() | Displays the Snackbar on the screen. |
| dismiss() | Dismisses the Snackbar immediately. |

## Usage

Follow these steps to use the ```Snackbar``` component:

1. Create a ```ref``` for the ```Snackbar``` using the ```SnackbarRef``` interface.
2. Pass the ```ref``` as a prop to the ```Snackbar``` component.
3. Use the ```show()``` method from ```ref.current``` to display the Snackbar, or use the ```dismiss()``` method to hide it.

**Code example:**
```typescript
import React, { useRef } from 'react';
import { Snackbar, type SnackbarRef } from '@computools/react-native-material-components';

const MyComponent = () => {
  const snackbarRef = useRef<SnackbarRef>(null);

  const handleActionPress = () => {
    console.log('Action button pressed');
  };

  const showSnackbar = () => {
    snackbarRef.current?.show();
  };

  const hideSnackbar = () => {
    snackbarRef.current?.dismiss();
  };

  return (
    <>
      <TextButton title="Show Snackbar" onPress={showSnackbar} />
      <Snackbar
        ref={snackbarRef}
        content="This is a Snackbar message!"
        action="Dismiss"
        onActionPress={hideSnackbar}
        duration={3000}
        showCloseIcon
      />
    </>
  );
};
```
