
# Getting started

## Pre-requisites

If you're already familiar with ```JavaScript```, ```React```, and ```React Native```, you'll find it easy to get started with our Material UI library! If not, we recommend gaining a foundational understanding of these technologies before diving in.

Here are some helpful resources to get you up to speed:

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React: Main Concepts](https://react.dev/learn)
- [React Hooks Guide](https://react.dev/reference/react)

Once you're comfortable with these concepts, come back and start building stunning React Native interfaces with ease!

## Minimum requirements

- ```react-native``` >= 0.72.4
- ```typescript``` >= 5.0.2 (if you use TypeScript)
- ```react-native-reanimated``` >= 3.6.1
- ```react-native-gesture-handler``` >= 3.6.1
- ```react-native-safe-area-context``` >= 4.10.7
- ```react-native-svg``` >= 15.3.0


## Installation

1. **Install the Library**

Run the following command to add the library to your project:

```
yarn add @computools/react-native-material-components
```

2. **Add Required Dependencies**

Install the necessary dependencies:

```
yarn add react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-svg

```

3. **Configure Babel for ```react-native-reanimated```**

Add the ```react-native-reanimated/plugin``` to your ```babel.config.js``` file. Ensure it is listed last in the plugins array to avoid configuration issues.

**Example ```babel.config.js```:**


```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin' // This must be the last plugin
  ],
};
```

For detailed information, refer to the https://docs.swmansion.com/react-native-reanimated/.

4. **Wrap the App in Required Providers**

Wrap your entire application in the ```SafeAreaProvider``` and ```GestureHandlerRootView``` components to enable safe area support and gesture handling.

**Here’s an example setup:**

```
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Your app code goes here */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

```

5. **Platform specific setup**

- Android

No additional steps are required for Android.

- IOS

Run the following commands to install the iOS dependencies:

```
cd ios && pod install && cd ..

```

6. **Rebuild the Project**

After completing the setup, rebuild your project to ensure all changes and dependencies are applied correctly:

- For Android:
Run ```yarn android``` or open the project in Android Studio and build it.

- For iOS:
Run ```yarn ios``` or open the .xcworkspace file in Xcode and build the project.

7. **Learn more about Font installation [here](/typography)**


