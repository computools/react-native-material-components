import React, {forwardRef, type ReactNode} from 'react';
import {Text, View, TouchableOpacity, type StyleProp, type TextStyle, type ViewProps} from 'react-native';

import {styles} from './basic-dialog.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {Dialog, type DialogRef} from '../dialog/Dialog.component';
import {useTypography} from '../../typography/useTypography.component';

export interface BasicDialogProps extends ViewProps {
  append?: ReactNode;
  prepend?: ReactNode;

  title?: string;
  subtitle?: string;
  firstActionTitle?: string;
  secondActionTitle?: string;

  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;

  onFirstActionPress?: () => void;
  onSecondActionPress?: () => void;
}

export const BasicDialog = forwardRef<DialogRef, BasicDialogProps>(
  (
    {
      append,
      prepend,

      title,
      subtitle,
      firstActionTitle,
      secondActionTitle,

      titleStyle,
      subtitleStyle,

      onFirstActionPress,
      onSecondActionPress,
      style,
      ...props
    },
    ref
  ) => {
    const {bodyMedium, headlineSmall, labelLarge} = useTypography();
    const {surfaceContainer, primaryContainer} = useTheme();

    return (
      <Dialog ref={ref} style={[style]} {...props}>
        {prepend}
        {title && <Text style={[headlineSmall, styles.title, {color: surfaceContainer.text}, titleStyle]}>{title}</Text>}
        {subtitle && <Text style={[bodyMedium, {color: surfaceContainer.textVariant}, subtitleStyle]}>{subtitle}</Text>}
        {append}
        {firstActionTitle && (
          <View style={styles.actions}>
            {/* Todo: replace with libriry's text buttons */}
            <TouchableOpacity onPress={onSecondActionPress}>
              <Text style={[labelLarge, {color: primaryContainer.text}]}>{secondActionTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onFirstActionPress}>
              <Text style={[labelLarge, {color: primaryContainer.text}]}>{firstActionTitle}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Dialog>
    );
  }
);
