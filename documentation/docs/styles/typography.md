# Typography

The library uses ```Roboto``` as the default font, providing a clean and modern look. You can use the default typography or customize it to suit your project’s needs. Below are the details for configuring and using typography.

## Default Typography

### Android

No additional setup is required for Android. The ```Roboto``` font is bundled and ready to use.

### iOS

For iOS, you’ll need to configure the ```Roboto``` font manually. Follow these steps:

1. **Add Font Configuration**

Create a ```react-native.config.js``` file at the root of your project and include the following content:

```
module.exports = {
    assets: ['node_modules/react-native-material-components/ios/fonts'],
};

```

2. **Link Font Assets**

Run the following command to link the font assets:

```
npx react-native-asset
```

This will:

- Copy the fonts to your IOS project.
- Update the ```Info.plist``` file automatically.

3. **Rebuild Your Project**

After linking the assets, rebuild your project to apply the changes.

## Accessing Typography in Components

Use the ```useTypography``` hook to retrieve the active typography styles in your components. This hook makes it simple to apply consistent typography throughout your app.

**Example:**

```
import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { useTypography } from '@computools/react-native-material-components';

export const AppBodyLargeText: React.FC<PropsWithChildren> = ({ children }) => {
  const { bodyLarge } = useTypography();

  return <Text style={bodyLarge}>{children}</Text>;
};

```

## Customizing Typography

To define your own typography styles, you can create a custom configuration and pass it to the ```MaterialComponentsProvider```.

### Creating a Custom Typography

You can start by modifying the default ```materialTypography``` object. This provides a consistent foundation while allowing customization of specific styles. Wrap your application in the ```MaterialComponentsProvider``` and provide your custom typography via the typography property.

**Example:**

```
import { MaterialComponentsProvider, materialTypography, MaterialTypography } from '@computools/react-native-material-components';

const customTypography: MaterialTypography = {
  ...materialTypography,
  bodyMedium: { ...materialTypography.bodyMedium, fontFamily: 'Montserrat-Medium' },
};

export default function App() {
  return (
    <MaterialComponentsProvider typography={customTypography}>
      {/* Your app content */}
    </MaterialComponentsProvider>
  );
}
```





