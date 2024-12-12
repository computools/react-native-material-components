// import React, {useState} from 'react';
// import {View, type ViewProps, type LayoutChangeEvent} from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import {BOTTOM_APP_BAR_PADDING_VARTICAL, styles} from './bottom-app-bar.styles';
// import {useTheme} from '../../theme/useTheme.hook';
// import type {IconProps} from '../../icons/icon-props';
// import {type IconButtonProps} from '../../buttons/icon-buttons/icon-button.types';
// import {FloatingActionButton, FloatingActionButtonSize} from '../../buttons/floating-action-button/FloatingActionButton.component';
// import {StandartIconButton} from '../../buttons/icon-buttons/standart-icon-button/StandardIconButton.component';
// import {PlusIcon} from '../../icons/plus-icon/PlusIcon.component';
// import Animated, {FadeInDown, useAnimatedStyle, withTiming, withSpring, type SharedValue} from 'react-native-reanimated';

// export interface BottomAppBarProps<T extends IconProps> extends ViewProps {
//   iconButtons: IconButtonProps<T>[];

//   scrollY?: SharedValue<number>;
// }

// export const BottomAppBar = <T extends IconProps>({iconButtons, scrollY, style, onLayout, ...props}: BottomAppBarProps<T>) => {
//   const [bottomBarHeight, setBottombarHeight] = useState(0);

//   const insets = useSafeAreaInsets();
//   const {surfaceContainer, secondaryContainer, surface} = useTheme();

//   const conteinerAnimatedStyle = useAnimatedStyle(() => {
//     console.log(scrollY?.value);
//     return typeof scrollY !== 'undefined'
//       ? {
//           transform: [{translateY: withSpring(scrollY?.value >= 0.1 ? bottomBarHeight : 0, {damping: 20})}],
//         }
//       : {};
//   });

//   const getBottomBarHeight = (e: LayoutChangeEvent) => {
//     setBottombarHeight(e.nativeEvent.layout.height);

//     if (onLayout) {
//       onLayout(e);
//     }
//   };

//   const renderIconButton = ({iconProps, ...rest}: IconButtonProps<T>, index: number) => (
//     <Animated.View
//       entering={FadeInDown.stiffness(1)
//         .damping(2)
//         .mass(0.3)
//         .delay(index * 80)}
//       key={`${index}-${rest.Icon.toString()}`}>
//       <StandartIconButton style={{width: 48, height: 48}} iconProps={{color: surface.textVariant, ...iconProps} as T} {...rest} />
//     </Animated.View>
//   );

//   return (
//     <>
//       <Animated.View
//         style={[
//           styles.container,
//           {backgroundColor: surfaceContainer.background, paddingBottom: insets.bottom + BOTTOM_APP_BAR_PADDING_VARTICAL},
//           conteinerAnimatedStyle,
//           style,
//         ]}
//         onLayout={getBottomBarHeight}
//         {...props}>
//         <View style={styles.iconButtons}>{iconButtons.map(renderIconButton)}</View>
//       </Animated.View>
//       <FloatingActionButton
//         style={{bottom: insets.bottom + 12, end: 16}}
//         Icon={PlusIcon}
//         iconProps={{color: secondaryContainer.text}}
//         size={FloatingActionButtonSize.BIG}
//       />
//     </>
//   );
// };
