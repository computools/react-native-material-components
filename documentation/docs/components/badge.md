# Badge

The ```Badge``` component is used to display concise information, such as a count, usually alongside another element like an icon or a button.

## Properties

| name | description | type | default |
| ------ | ------ | ------ | ----|
| value | Required. The content displayed inside the badge. Typically a string, such as a number or label. | string | - |
| valueStyle | Customizes the text style of the badge content. Accepts a TextStyle object. | TextStyle | - |

## Usage Example

```
import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge } from '@computools/react-native-material-components';

export const Component: React.FC = () => {
  return (
    <>
      <Badge value="5" style={styles.badgeText} />
      <Icon />
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
```

## Visual Example

![badge](https://ik.imagekit.io/Computools/rn-material-components/badge_light.png?updatedAt=1733926687727)

