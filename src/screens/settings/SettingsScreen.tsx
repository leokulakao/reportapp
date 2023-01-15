import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';

import { expo } from '../../../app.json';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import Theme from '../../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LanguageSelect from '../../components/language/LanguageSelect';
import ThemeSelect from '../../components/theme/ThemeSelect';
import { SettingsStackParamList } from './SettingsStack';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = (props) => {
  const { navigation } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();
  const languageFormRef = useRef<any>(null);
  const themeFormRef = useRef<any>(null);

  return (
    <ScreenSafeAreaContainer style={styles(theme).screenContainer} tabsIndent>
      <>
        <Text style={styles(theme).title}>{t('Settings')}</Text>

        <View style={styles(theme).buttonsGridContainer}>
          <View style={styles(theme).buttonsRow}>
            <SettingsNavLink
              text="Synchronization and backups"
              icon="cloud-upload-outline"
              onPress={() => navigation?.navigate('Backup')}
            />
            <SettingsNavLink
              text="Languages"
              icon="language-outline"
              onPress={() => languageFormRef?.current.open()}
            />
          </View>
          <View style={styles(theme).buttonsRow}>
            <SettingsNavLink
              text="Appearance"
              icon="color-palette-outline"
              onPress={() => themeFormRef?.current.open()}
            />
            <SettingsNavLink
              text="Donations"
              icon="heart-outline"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles(theme).screenFooter}>
          <TouchableOpacity
            onPress={() => navigation?.navigate('PrivacyPolicy')}
            activeOpacity={0.7}
          >
            <Text style={styles(theme).screenFooterText}>
              {t('Privacy Policy')}
            </Text>
          </TouchableOpacity>

          <Text style={styles(theme).screenFooterText}>
            {expo.version} ({expo.ios.buildNumber})
          </Text>
        </View>
        <LanguageSelect ref={languageFormRef} />
        <ThemeSelect ref={themeFormRef} />
      </>
    </ScreenSafeAreaContainer>
  );
};

type SettingsNavLinkProps = {
  text: string;
  icon: string;
  onPress: () => void;
};

const SettingsNavLink: React.FC<SettingsNavLinkProps> = ({
  text,
  icon,
  onPress,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      style={styles(theme).navLink}
      onPress={() => onPress()}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={55} />
      <Text style={styles(theme).navLinkText}>{t(text)}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      backgroundColor: theme.colors.backgroundColor,
      paddingHorizontal: 25,
      paddingTop: 30,
    },
    title: {
      marginBottom: 30,
      fontSize: 49,
      lineHeight: 58,
    },
    // GRID LAYOUT
    buttonsGridContainer: {
      height: Dimensions.get('window').width,
      marginHorizontal: -10,
    },
    buttonsRow: {
      flex: 1,
      flexDirection: 'row',
    },
    // SettingsNavLink
    navLink: {
      marginHorizontal: 10,
      marginBottom: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: theme.colors.secondaryBackgroundColor,
      borderRadius: 15,
    },
    navLinkText: {
      marginTop: 10,
      textAlign: 'center',
    },
    // ------
    screenFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 'auto',
      paddingBottom: Platform.OS === 'android' ? 75 : 20,
    },
    screenFooterText: {
      fontSize: 14,
      lineHeight: 17,
      color: theme.colors.secondaryTextColor,
    },
  });

export default SettingsScreen;
