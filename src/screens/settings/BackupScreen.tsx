import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import Theme from '../../theme';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import MainButton from '../../components/buttons/MainButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackParamList } from './SettingsStack';
import ScreenHeader from '../../components/ScreenHeader';
import { useSelector } from 'react-redux';
import { selectBackup } from '../../store/reports/reportsSelectors';
import { useDispatch } from 'react-redux';
import { doUploadBackup } from '../../store/reports/reportsService';
import { Backup } from '../../store/reports/reportsState';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Backup'>;

const BackupScreen: React.FC<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  const dispatch = useDispatch();

  const backupData = useSelector(selectBackup());
  const backupDataJson = JSON.stringify(backupData);

  const createBackupFile = async () => {
    let fileUri = FileSystem.documentDirectory + `reportapp.reportbackup`;

    FileSystem.writeAsStringAsync(fileUri, backupDataJson, {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then(() => {
        Sharing.shareAsync(fileUri);
      })
      .catch((err) => {
        console.log('[FILE CREATION ERROR]', err);
      });
  };

  const restoreBackupFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: ['*/*'],
      });

      if (result.type !== 'cancel') {
        FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.UTF8,
        })
          .then((r: string) => {
            const _backup: Backup = JSON.parse(r);
            doUploadBackup(dispatch, _backup.reports);
          })
          .catch((err) => {
            console.log('[READ BACKUP FILE ERROR]', err);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScreenSafeAreaContainer
      style={styles(theme).screenContainer}
      disableSafeAreaEdges={['top']}
    >
      <>
        <ScreenHeader title={t('Synchronization')} />

        <View style={[styles(theme).container, styles(theme).backupInfoBlock]}>
          <View style={styles(theme).backupInfo}>
            <Icon
              name="sync-outline"
              size={50}
              color={theme.colors.accentColor}
            />
            <Text style={styles(theme).backupInfoText}>
              {t('Here you can back up & restore your reports and statistics')}
            </Text>
          </View>
        </View>

        <View style={[styles(theme).container, styles(theme).backupActions]}>
          <MainButton
            text={t('Create a back up')}
            onPress={createBackupFile}
            style={styles(theme).backupButtonMargin}
          />
          <MainButton
            text={t('Restore a backup')}
            onPress={restoreBackupFile}
          />
        </View>
      </>
    </ScreenSafeAreaContainer>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      backgroundColor: theme.colors.backgroundColor,
    },
    container: {
      paddingHorizontal: 25,
    },
    backupInfoBlock: {
      paddingVertical: 22,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    backupInfo: {
      flexDirection: 'row',
      marginBottom: 20,
      paddingRight: 30,
    },
    backupInfoText: {
      marginLeft: 22,
      marginTop: 10,
      color: theme.colors.secondaryTextColor,
    },
    backupActions: {
      paddingVertical: 25,
    },
    backupButtonMargin: {
      marginBottom: 16,
    },
  });

export default BackupScreen;
