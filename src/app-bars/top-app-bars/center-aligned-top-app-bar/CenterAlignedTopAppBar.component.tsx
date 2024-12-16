import React from 'react';
import {Text, type StyleProp, type TextStyle} from 'react-native';

import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {styles} from './center-aligned-top-app-bar.styles';
import {useTypography} from '../../../typography/useTypography.component';
import {ArrowBackIcon} from '../../../icons/arrow-back-icon/ArrowBackIcon.component';
import {BaseTopAppBar, type BaseTopAppBarProps} from '../base-top-app-bar/BaseTopAppBar.component';
import {StandartIconButton} from '../../../buttons/icon-buttons/standart-icon-button/StandardIconButton.component';
import {AccountCircleFilledIcon} from '../../../icons/account-circle-filled-icon/AccountCircleFilledIcon.component';

export interface CenterAlignedTopAppBarProps<T extends IconProps> extends BaseTopAppBarProps {
  title: string;

  StartIcon?: React.FC;
  EndIcon?: React.FC;
  iconProps?: T;
  titleStyle?: StyleProp<TextStyle>;
}

export const CenterAlignedTopAppBar = <T extends IconProps>({
  title,
  scrollStatus,
  EndIcon = AccountCircleFilledIcon,
  StartIcon = ArrowBackIcon,
  iconProps,
  style,
  titleStyle,
  ...props
}: CenterAlignedTopAppBarProps<T>) => {
  const {surface} = useTheme();
  const {titleLarge} = useTypography();

  return (
    <BaseTopAppBar scrollStatus={scrollStatus} style={[styles.container, style]} {...props}>
      <StandartIconButton Icon={StartIcon} iconProps={{color: surface.text, size: 24, ...iconProps}} />
      <Text numberOfLines={1} style={[styles.title, titleLarge, {color: surface.text}, titleStyle]}>
        {title}
      </Text>
      <StandartIconButton Icon={EndIcon} iconProps={{color: surface.text, size: 24, ...iconProps}} />
    </BaseTopAppBar>
  );
};
