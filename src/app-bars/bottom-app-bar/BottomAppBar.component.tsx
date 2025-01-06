import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useImperativeHandle, useState, forwardRef} from 'react';
import {View, type ViewProps, type LayoutChangeEvent} from 'react-native';
import Animated, {useAnimatedStyle, withSpring, type SharedValue} from 'react-native-reanimated';

import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {ScrollDirection} from '../../types/scroll-direction.type';
import {BOTTOM_APP_BAR_PADDING_VARTICAL, styles} from './bottom-app-bar.styles';
import {type IconButtonProps} from '../../buttons/icon-buttons/icon-button.types';
import {FloatingActionButton, FloatingActionButtonSize} from '../../buttons/floating-action-button/FloatingActionButton.component';
import {AnimatedBottomAppBarActionButton} from './animated-bottom-app-bar-action-button/AnimatedBottomAppBarActionButton.component';

export interface BottomAppBarProps<T extends IconProps> extends ViewProps {
  iconButtons: IconButtonProps<T>[];

  FabIcon?: React.FC;
  fabLabel?: string;
  scrollDirection?: SharedValue<ScrollDirection>;
  animationDelay?: number;
  animationDumping?: number;

  onFabPress?: () => void;
}

export interface BottomAppBarRef {
  getHeight: () => void;
}

const FAB_BOTTOM_GAP = 12;

export const BottomAppBar = forwardRef(
  <T extends IconProps>(
    {iconButtons, scrollDirection, FabIcon, fabLabel, style, onFabPress, onLayout, animationDelay, animationDumping, ...props}: BottomAppBarProps<T>,
    ref: React.Ref<BottomAppBarRef>
  ) => {
    const [bottomBarHeight, setBottombarHeight] = useState(0);

    const insets = useSafeAreaInsets();
    const {surfaceContainer, secondaryContainer} = useTheme();

    useImperativeHandle(ref, () => ({
      getHeight: () => bottomBarHeight,
    }));

    const conteinerAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{translateY: withSpring(scrollDirection?.value === ScrollDirection.DOWN ? bottomBarHeight : 0, {damping: 20})}],
    }));

    const getBottomBarHeight = (e: LayoutChangeEvent) => {
      setBottombarHeight(e.nativeEvent.layout.height);

      if (onLayout) {
        onLayout(e);
      }
    };

    const renderIconButton = (iconButton: IconButtonProps<T>, index: number) => (
      <AnimatedBottomAppBarActionButton
        key={`${iconButton.Icon.toString()}-${index}`}
        buttonProps={iconButton}
        index={index}
        scrollDirection={scrollDirection}
        bottomBarHeight={bottomBarHeight}
        animationDelay={animationDelay}
        animationDumping={animationDumping}
      />
    );

    return (
      <>
        <Animated.View
          style={[
            styles.container,
            {backgroundColor: surfaceContainer.background, paddingBottom: insets.bottom + BOTTOM_APP_BAR_PADDING_VARTICAL},
            conteinerAnimatedStyle,
            style,
          ]}
          onLayout={getBottomBarHeight}
          {...props}>
          <View style={styles.iconButtons}>{iconButtons.map(renderIconButton)}</View>
        </Animated.View>
        {FabIcon && (
          <FloatingActionButton
            Icon={FabIcon}
            label={fabLabel}
            onPress={onFabPress}
            size={FloatingActionButtonSize.BIG}
            iconProps={{color: secondaryContainer.text}}
            style={[styles.fab, {bottom: insets.bottom + FAB_BOTTOM_GAP}]}
          />
        )}
      </>
    );
  }
);
