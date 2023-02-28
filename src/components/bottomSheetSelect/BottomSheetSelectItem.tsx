import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';

import Theme from '../../theme';

type Props = {
  item: string;
  isActive: boolean;
  onPress: () => void;
};

const BottomSheetSelectItem: React.FC<Props> = ({
  item,
  isActive,
  onPress,
}) => {
  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles(theme).selectItem}
      activeOpacity={0.7}
    >
      <Text style={styles(theme).selectItemText}>{item}</Text>
      {isActive ? (
        <Icon
          name="checkmark-outline"
          size={22}
          color={theme.colors.textColor}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    selectItem: {
      height: 52,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 24,
      backgroundColor: theme.colors.secondaryBackgroundColor,
      borderRadius: 8,
    },
    selectItemText: {
      color: theme.colors.textColor,
      fontSize: 14,
      lineHeight: 22,
    },
  });

export default BottomSheetSelectItem;
