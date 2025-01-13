import React, {forwardRef, type ReactNode} from 'react';
import {Text, View, type StyleProp, type TextStyle, type ViewProps} from 'react-native';

import {styles} from './basic-dialog.styles';
import {useTheme} from '../../../theme/useTheme.hook';
import {Dialog, type DialogRef} from '../dialog/Dialog.component';
import {useTypography} from '../../../typography/useTypography.component';
import {TextButton} from '../../buttons/common-buttons/text-button/TextButton.component';

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
    const {surfaceContainer} = useTheme();
    const {bodyMedium, headlineSmall} = useTypography();

    const renderActionButtons = () => (
      <View style={styles.actions}>
        {secondActionTitle ? <TextButton style={styles.actionButton} onPress={onSecondActionPress} title={secondActionTitle} /> : null}
        {firstActionTitle ? <TextButton style={styles.actionButton} onPress={onFirstActionPress} title={firstActionTitle} /> : null}
      </View>
    );

    return (
      <Dialog ref={ref} style={[style]} {...props}>
        {prepend}
        {title ? <Text style={[headlineSmall, styles.title, {color: surfaceContainer.text}, titleStyle]}>{title}</Text> : null}
        {subtitle ? <Text style={[bodyMedium, {color: surfaceContainer.textVariant}, subtitleStyle]}>{subtitle}</Text> : null}
        {append}
        {firstActionTitle ? renderActionButtons() : null}
      </Dialog>
    );
  }
);
