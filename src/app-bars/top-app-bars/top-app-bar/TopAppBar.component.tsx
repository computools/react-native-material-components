import React from 'react';
import {Text, View, type StyleProp, type TextStyle} from 'react-native';

import {styles} from './top-app-bar.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {useTypography} from '../../../typography/useTypography.component';
import {type IconButtonProps} from 'src/buttons/icon-buttons/icon-button.types';
import {ArrowBackIcon} from '../../../icons/arrow-back-icon/ArrowBackIcon.component';
import {BaseTopAppBar, type BaseTopAppBarProps} from '../base-top-app-bar/BaseTopAppBar.component';
import {StandartIconButton} from '../../../buttons/icon-buttons/standart-icon-button/StandardIconButton.component';

export enum TopAppBarSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export interface TopAppBarProps<T extends IconProps> extends BaseTopAppBarProps {
  title: string;

  size?: TopAppBarSize;
  StartIcon?: React.FC;
  actions?: IconButtonProps<T>[];
  startIconProps?: T;
  titleStyle?: StyleProp<TextStyle>;
}

export const TopAppBar = <T extends IconProps>({
  title,
  scrollStatus,
  actions = [],
  size = TopAppBarSize.SMALL,
  StartIcon = ArrowBackIcon,
  startIconProps,
  style,
  titleStyle,
  ...props
}: TopAppBarProps<T>) => {
  const {surface} = useTheme();
  const {titleLarge, headlineSmall, headlineMedium} = useTypography();

  const titleTypography: Record<TopAppBarSize, TextStyle> = {
    [TopAppBarSize.SMALL]: titleLarge,
    [TopAppBarSize.MEDIUM]: headlineSmall,
    [TopAppBarSize.LARGE]: headlineMedium,
  };

  const renderActionButton = ({Icon, iconProps, ...restProps}: IconButtonProps<T>, index: number) => (
    <StandartIconButton
      key={`${index}-${Icon.toString()}`}
      Icon={Icon}
      iconProps={{color: surface.text, size: 24, ...iconProps} as T}
      {...restProps}
    />
  );

  return (
    <BaseTopAppBar scrollStatus={scrollStatus} style={[styles[size].container, style]} {...props}>
      <View style={styles[size].actionsBar}>
        <StandartIconButton Icon={StartIcon} iconProps={{color: surface.text, size: 24, ...startIconProps}} />
        {size === TopAppBarSize.SMALL && (
          <Text numberOfLines={1} style={[styles[size].title, titleLarge, {color: surface.text}, titleStyle]}>
            {title}
          </Text>
        )}
        <View style={styles[size].actions}>{actions.map(renderActionButton)}</View>
      </View>
      {size !== TopAppBarSize.SMALL && (
        <Text numberOfLines={1} style={[styles[size].title, titleTypography[size], {color: surface.text}, titleStyle]}>
          {title}
        </Text>
      )}
    </BaseTopAppBar>
  );
};
