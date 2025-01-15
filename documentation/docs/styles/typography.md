# Typography in React Native Material Design

Material Design uses the **Roboto** font family as the default typography. However, it is the developer's responsibility to set up the required font assets in their project. This document provides a single, streamlined guide to:

- Set up a font.
- Use custom fonts for overriding the default typography.

## Setting Up Fonts

### Step 1: Download and Organize Font Files
1. **Download Fonts**: Obtain the required font files (e.g., `.ttf` or `.otf`) from a trusted source or a designer.
2. **Unzip and Rename**: Extract and rename the font files if needed (e.g., `Roboto-Regular.ttf`).
3. **Add to Project**: Create a folder in your project for fonts (e.g., `src/assets/fonts`) and place the font files there.

### Step 2: Configure Font Assets
1. Create a `react-native.config.js` file in the root of your project with the following content:

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'], // Adjust the path based on your folder structure
};
```

2. Run the following command to link the font files:

```bash
npx react-native-asset
```

This command:
- Links fonts for iOS by adding `link-assets-manifest.json`.
- Copies fonts to the appropriate Android assets folder.

### Step 3: Add Fonts to iOS Targets

For iOS, update your app’s `Info.plist` file to include the fonts:

```xml
<key>UIAppFonts</key>
<array>
  <string>Roboto-Regular.ttf</string>
  <string>Roboto-Bold.ttf</string>
  <string>Roboto-Italic.ttf</string>
  ...
</array>
```

If your app has multiple targets, repeat this step for each target under **Build Phases > Copy Bundle Resources** in Xcode.

### Step 4: Use Fonts in Styles
Ensure the `fontFamily` values match:

- **Android**: Match the file name, e.g., `Roboto-Bold.ttf` -> `fontFamily: 'Roboto-Bold'`.
- **iOS**: Use the PostScript name of the font. You can find it using Font Book or by logging available fonts in Xcode:

## Customizing Typography

If you want to use a font other than Roboto, you can override the default typography configuration.

### Example: Using a Custom Font

1. Import the necessary components from the Material Design library:

```typescript
import { MaterialComponentsProvider, materialTypography, MaterialTypography } from '@computools/react-native-material-components';
```

2. Create a custom typography object by extending the default `materialTypography`:

```typescript
const customTypography: MaterialTypography = {
  ...materialTypography,
  bodyMedium: { ...materialTypography.bodyMedium, fontFamily: 'Montserrat-Medium' },
};
```

3. Wrap your app in the `MaterialComponentsProvider` and pass the custom typography:

```typescript
export default function App() {
  return (
    <MaterialComponentsProvider typography={customTypography}>
      {/* Your app content */}
    </MaterialComponentsProvider>
  );
}
```

## Troubleshooting Tips

1. **Fonts Not Applying:**
   - Check file names, paths, and `fontFamily` values.
   - Ensure `npx react-native-asset` is run after adding or renaming fonts.

2. **Inconsistent Behavior:**
   - Use the correct font names for each platform.
   - Verify the PostScript name for iOS and file name for Android.

3. **Missing Fonts in Targets:**
   - Ensure fonts are added under **Build Phases > Copy Bundle Resources** for all targets in Xcode.
