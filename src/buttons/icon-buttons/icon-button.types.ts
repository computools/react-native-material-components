import {type IconProps} from '../../icons/icon-props';
import {type BaseIconButtonProps} from './base-icon-button/BaseIconButton.component';

export interface IconButtonProps<T extends IconProps> extends BaseIconButtonProps<T> {
  selected?: boolean;
  selectedIcon?: React.FC<T>;
}
