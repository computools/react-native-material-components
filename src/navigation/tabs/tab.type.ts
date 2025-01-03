import {type TouchableOpacityProps, type StyleProp, type TextStyle} from 'react-native';

export interface Tab<T, Y> extends Omit<TouchableOpacityProps, 'onPress'> {
  routeName: T;

  title?: string;
  icon?: React.FC<Y>;
  badge?: string;
  iconProps?: Y;
  titleStyle?: StyleProp<TextStyle>;
}
