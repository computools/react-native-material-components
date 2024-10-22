import type {IconProps} from '../../icons/icon-props';
import type {BaseIconButtonProps} from './base-icon-button/BaseIconButton.component';

export interface IconButtonProps extends BaseIconButtonProps {
  selected?: boolean;
  selectedIcon?: React.FC<IconProps>;
}
