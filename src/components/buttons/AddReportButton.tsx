import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';

import Theme from '../../theme';

type Props = {
  onPress: () => void;
  headerButton?: boolean;
};

const AddReportButton: React.FC<Props> = (props) => {
  const { onPress, headerButton } = props;
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        headerButton
          ? styles(theme).headerButton
          : [
              styles(theme).button,
              {
                bottom: insets.bottom + (Platform.OS === 'android' ? 105 : 75),
              },
            ]
      }
      activeOpacity={0.7}
    >
      <Icon
        name="add"
        size={40}
        color={
          headerButton ? theme.colors.iconColor : theme.colors.contrastIconColor
        }
      />
    </TouchableOpacity>
  );
};

export default AddReportButton;

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: 0,
      right: 40,
      width: 62,
      height: 62,
      paddingLeft: 3,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.accentColor,
    },
    headerButton: {
      width: 36,
      height: 36,
      paddingLeft: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
