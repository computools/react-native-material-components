export * from './components/icons';

export {Badge, type BadgeProps} from './components/badge/Badge.component';

export {Divider, type DividerProps} from './components/divider/Divider.component';

export {NavBar} from './components/navigation/navigation-bar/NavBar.component';
export {Slider, type SliderProps} from './components/sliders/slider /Slider.component';
export {RangeSlider, type RangeSliderProps} from './components/sliders/range-slider/RangeSlider.component';

export {InputChip, type InputChipProps} from './components/chips/input-chip/InputChip.component';
export {FilterChip, type FilterChipProps} from './components/chips/filter-chip/FilterChip.component';
export {AssistChip, type AssistChipProps, IconType} from './components/chips/assist-chip/AssistChip.component';
export {SuggestionChip, type SuggestionChipProps} from './components/chips/suggestion-chip/SuggestionChip.component';

export {PrimaryTabs, type PrimaryTabsProps} from './components/navigation/tabs/primary-tabs/PrimaryTabs.component';
export {SecondaryTabs, type SecondaryTabsProps} from './components/navigation/tabs/secondary-tabs/SecondaryTabs.component';

export {FilledTextInput, type FilledTextInputProps} from './components/text-inputs/filled-text-input/FilledTextInput.component';
export {OutlinedTextInput, type OutlinedTextInputProps} from './components/text-inputs/outlined-text-input/OutlinedTextInput.component';

export {
  CenterAlignedTopAppBar,
  type CenterAlignedTopAppBarProps,
} from './components/app-bars/top-app-bars/center-aligned-top-app-bar/CenterAlignedTopAppBar.component';
export {TopAppBar, type TopAppBarProps, TopAppBarSize} from './components/app-bars/top-app-bars/top-app-bar/TopAppBar.component';
export {BottomAppBar, type BottomAppBarProps, type BottomAppBarRef} from './components/app-bars/bottom-app-bar/BottomAppBar.component';

export {BottomSheet, type BottomSheetProps, type BottomSheetRef} from './components/sheets/bottom-sheet/BottomSheet.component';
export {SideSheet, type SideSheetProps, type SideSheetRef, type StickySide} from './components/sheets/side-sheet/SideSheet.component';

export {Checkbox} from './components/controls/checkbox/checkbox.component';
export {Switch, type SwitchProps} from './components/controls/switch/switch.component';
export {RadioButton, type RadioButtonProps} from './components/controls/radio-button/RadioButton.component';

export {FilledCard} from './components/cards/filled-card/FilledCard.component';
export {OutlinedCard} from './components/cards/outlined-card/OutlinedCard.component';
export {ElevatedCard} from './components/cards/elevated-card/ElevatedCard.cpmponent';

export {Dialog, type DialogRef, type DialogProps} from './components/dialogs/dialog/Dialog.component';
export {BasicDialog, type BasicDialogProps} from './components/dialogs/basic-dialog/BasicDialog.component';
export {FullScreenDialog, AnimationType, type FullScreenDialogRef} from './components/dialogs/full-screen-dialog/FullScreenDialog.component';

export {Snackbar, type SnackbarProps, type SnackbarRef} from './components/snackbar/Snackbar.component';

export {
  FloatingActionButton,
  FloatingActionButtonType,
  FloatingActionButtonSize,
  type FloatingActionButtonProps,
} from './components/buttons/floating-action-button/FloatingActionButton.component';

export {SegmentedButton} from './components/buttons/segmented-button/SegmentedButton.component';

export {TextButton} from './components/buttons/common-buttons/text-button/TextButton.component';
export {TonalButton} from './components/buttons/common-buttons/tonal-button/TonalButton.component';
export {FilledButton} from './components/buttons/common-buttons/filled-button/FilledButton.component';
export {ElevatedButton} from './components/buttons/common-buttons/elevated-button/ElevatedButton.component';
export {OutlinedButton} from './components/buttons/common-buttons/outlined-button/OutlinedButton.component';
export {type CommonButtonProps} from './components/buttons/common-buttons/common-button/CommonButton.component';

export {type IconButtonProps} from './components/buttons/icon-buttons/icon-button.types';
export {TonalIconButton} from './components/buttons/icon-buttons/tonal-icon-button/TonalIconButton.component';
export {FilledIconButton} from './components/buttons/icon-buttons/filled-icon-button/FilledIconButton.component';
export {StandartIconButton} from './components/buttons/icon-buttons/standart-icon-button/StandardIconButton.component';
export {OutlinedIconButton} from './components/buttons/icon-buttons/outlined-icon-button/OutlinedIconButton.component';

export {
  CircularActivityIndicator,
  type CircularActivityIndicatorProps,
} from './components/activity-indicators/circular-activity-indicator/CircularActivityIndicator.component';
export {LinearActivityIndicator} from './components/activity-indicators/linear-activity-indicator/LinearActivityIndicator.component';

export {type IconProps} from './types/icon-props.type';
export {ScrollDirection} from './types/scroll-direction.type';

export {materialTypography} from './typography/typography.styles';
export {useTypography} from './typography/useTypography.component';
export {type MaterialTypography} from './typography/typography.types';

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

export {type MaterialComponentsProviderProps, MaterialComponentsProvider} from './provider/MaterialComponents.context';
