import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import Theme from '../../theme';
import ScreenSafeAreaContainer from '../../components/ScreenSafeAreaContainer';
import MainButton from '../../components/buttons/MainButton';

type Props = {
  navigation?: NavigationProp<any, any>;
};

const BackupScreen: React.FC<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  const createBackupFile = async () => {
    let fileUri = FileSystem.documentDirectory + 'text.txt';

    // CREATE BACKUP FILE
    FileSystem.writeAsStringAsync(fileUri, 'Hello World', {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then(() => {
        Sharing.shareAsync(fileUri);
        // ADD --> Detach Modal
      })
      .catch((err) => {
        console.log('[FILE CREATION ERROR]', err);
      });
  };

  const restoreBackupFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: ['text/*'],
      });

      if (result.type !== 'cancel') {
        FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.UTF8,
        })
          .then((r) => {
            // GET BACKUP FILE CONTENT AS A TEXT
            console.log('[READ FILE]', r);
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
        <View style={styles(theme).container}>
          <Text style={styles(theme).title}>Syncranizaci??n</Text>
        </View>

        <View style={[styles(theme).container, styles(theme).backupInfoBlock]}>
          <View style={styles(theme).backupInfo}>
            <Icon name="sync-outline" size={50} />
            <Text style={styles(theme).backupInfoDay}>
              ??ltima copia: viernes 9:41
            </Text>
          </View>
          <Text>....</Text>
        </View>

        <View style={[styles(theme).container, styles(theme).backupActions]}>
          <MainButton
            text="Realizar copia de seguridad"
            onPress={createBackupFile}
            style={styles(theme).backupButtonMargin}
          />
          <MainButton
            text="Restaurar una copia de seguridad"
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
    title: {
      color: theme.colors.textColor,
      fontSize: 49,
      lineHeight: 58,
      marginBottom: 30,
      marginTop: 10,
    },
    backupInfoBlock: {
      paddingVertical: 22,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    backupInfo: {
      flexDirection: 'row',
      marginBottom: 22,
    },
    backupInfoDay: {
      marginLeft: 22,
      marginTop: 10,
      color: '#7C7C7C',
    },
    backupActions: {
      paddingVertical: 25,
    },
    backupButtonMargin: {
      marginBottom: 16,
    },
  });

export default BackupScreen;
