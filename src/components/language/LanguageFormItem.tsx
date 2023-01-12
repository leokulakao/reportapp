import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import Theme from '../../theme';

type Props = {
  langId: string;
};

const LanguageFormItem: React.FC<Props> = ({ langId }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      onPress={() => i18n.changeLanguage(langId)}
      style={styles(theme).langItem}
      activeOpacity={0.7}
    >
      <Text style={styles(theme).langItemText}>{t(langId)}</Text>
      {langId === i18n.language ? (
        <Icon
          name="checkmark-outline"
          size={24}
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
    langItem: {
      height: 52,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 24,
      backgroundColor: theme.colors.secondaryBackgroundColor,
      borderRadius: 8,
    },
    langItemText: {
      // marginHorizontal: 15,
      fontSize: 18,
      lineHeight: 22,
    },
  });

export default LanguageFormItem;
