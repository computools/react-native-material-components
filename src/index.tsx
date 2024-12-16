export * from './icons';

export {Badge, type BadgeProps} from './badge/Badge.component';

export {Divider, type DividerProps} from './divider/Divider.component';

export {
  CenterAlignedTopAppBar,
  type CenterAlignedTopAppBarProps,
} from './app-bars/top-app-bars/center-aligned-top-app-bar/CenterAlignedTopAppBar.component';
export {TopAppBar, type TopAppBarProps, TopAppBarSize} from './app-bars/top-app-bars/top-app-bar/TopAppBar.component';
export {BottomAppBar, type BottomAppBarProps, type BottomAppBarRef, ScrollDirection} from './app-bars/bottom-app-bar/BottomAppBar.component';

export {BottomSheet, type BottomSheetProps, type BottomSheetRef} from './sheets/bottom-sheet/BottomSheet.component';
export {SideSheet, type SideSheetProps, type SideSheetRef, type StickySide} from './sheets/side-sheet/SideSheet.component';

export {Checkbox} from './controls/checkbox/checkbox.component';
export {Switch, type SwitchProps} from './controls/switch/switch.component';
export {RadioButton, type RadioButtonProps} from './controls/radio-button/RadioButton.component';

export {FilledCard} from './cards/filled-card/FilledCard.component';
export {OutlinedCard} from './cards/outlined-card/OutlinedCard.component';
export {ElevatedCard} from './cards/elevated-card/ElevatedCard.cpmponent';

export {Dialog, type DialogRef, type DialogProps} from './dialogs/dialog/Dialog.component';
export {BasicDialog, type BasicDialogProps} from './dialogs/basic-dialog/BasicDialog.component';
export {FullScreenDialog, AnimationType, type FullScreenDialogRef} from './dialogs/full-screen-dialog/FullScreenDialog.component';

export {Snackbar, type SnackbarProps, type SnackbarRef} from './snackbar/Snackbar.component';

export {SegmentedButton} from './buttons/segmented-button/SegmentedButton.component';

export {TextButton} from './buttons/common-buttons/text-button/TextButton.component';
export {TonalButton} from './buttons/common-buttons/tonal-button/TonalButton.component';
export {FilledButton} from './buttons/common-buttons/filled-button/FilledButton.component';
export {ElevatedButton} from './buttons/common-buttons/elevated-button/ElevatedButton.component';
export {OutlinedButton} from './buttons/common-buttons/outlined-button/OutlinedButton.component';
export {type CommonButtonProps} from './buttons/common-buttons/common-button/CommonButton.component';

export {type IconButtonProps} from './buttons/icon-buttons/icon-button.types';
export {TonalIconButton} from './buttons/icon-buttons/tonal-icon-button/TonalIconButton.component';
export {FilledIconButton} from './buttons/icon-buttons/filled-icon-button/FilledIconButton.component';
export {StandartIconButton} from './buttons/icon-buttons/standart-icon-button/StandardIconButton.component';
export {OutlinedIconButton} from './buttons/icon-buttons/outlined-icon-button/OutlinedIconButton.component';

export {
  FloatingActionButton,
  FloatingActionButtonType,
  FloatingActionButtonSize,
  type FloatingActionButtonProps,
} from './buttons/floating-action-button/FloatingActionButton.component';

export {
  CircularActivityIndicator,
  type CircularActivityIndicatorProps,
} from './activity-indicators/circular-activity-indicator/CircularActivityIndicator.component';
export {LinearActivityIndicator} from './activity-indicators/linear-activity-indicator/LinearActivityIndicator.component';

export {
  type Theme,
  type ColorValue,
  type ThemeColors,
  type AccentThemeBlock,
  type SurfaceTextColors,
  type SurfaceThemeBlock,
  type BaseAccentThemeBlock,
  type AccentPrimaryThemeBlock,
  type SurfaceContainerThemeBlock,
} from './theme/theme.types';
export {useTheme} from './theme/useTheme.hook';
export {LightTheme, DarkTheme, defaultThemeColors, buildThemesFromColors} from './theme/build-theme';

export {materialTypography} from './typography/typography.styles';
export {useTypography} from './typography/useTypography.component';
export {type MaterialTypography} from './typography/typography.types';

export {type MaterialComponentsProviderProps, MaterialComponentsProvider} from './provider/MaterialComponents.context';

export {type IconProps} from './types/icon-props.type';
