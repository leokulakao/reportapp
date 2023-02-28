import React, { useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import LottieView from 'lottie-react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

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
import BottomSheetModalComp from '../../components/BottomSheetModalComp';
import { Backup } from '../../models';

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
        type: ['*/*'],
      });

      if (result.type !== 'cancel') {
        FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.UTF8,
        })
          .then((r: string) => {
            const _backup: Backup = JSON.parse(r);
            doUploadBackup(dispatch, _backup);

            // Toggle bottom sheet
            bottomSheetModalRef.current?.present();
            setTimeout(() => {
              bottomSheetModalRef.current?.close();
            }, 1900);
          })
          .catch((err) => {
            console.log('[READ BACKUP FILE ERROR]', err);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // BOTTOM SHEET REF
  const animation = useRef(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  return (
    <ScreenSafeAreaContainer
      style={styles(theme).screenContainer}
      disableSafeAreaEdges={['top']}
    >
      <>
        <ScreenHeader title={t('Synchronization')} />

        <View style={[styles(theme).container, styles(theme).backupInfoBlock]}>
          <Icon
            name="sync-outline"
            size={50}
            color={theme.colors.accentColor}
          />
          <Text style={styles(theme).backupInfoText}>
            {t('Here you can back up & restore your reports and statistics')}
          </Text>
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

        <BottomSheetModalComp
          innerRef={bottomSheetModalRef}
          snapPoints={snapPoints}
          bottomInset={46}
          detached={true}
          style={styles(theme).sheetContainer}
        >
          <View style={styles(theme).sheetContentContainer}>
            <LottieView
              onLayout={() => {
                animation.current?.play();
              }}
              ref={animation}
              style={styles(theme).sheetAnimatedIcon}
              source={require('../../../assets/lottie/loadingCheck.json')}
            />
          </View>
        </BottomSheetModalComp>
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
      flexDirection: 'row',
      paddingVertical: 22,
      backgroundColor: theme.colors.secondaryBackgroundColor,
    },
    backupInfoText: {
      flex: 1,
      flexWrap: 'wrap',
      marginTop: 10,
      marginLeft: 15,
      color: theme.colors.secondaryTextColor,
    },
    backupActions: {
      paddingVertical: 30,
    },
    backupButtonMargin: {
      marginBottom: 16,
    },
    // BOTTOM SHEET
    sheetContainer: {
      // add horizontal space
      marginHorizontal: 25,
    },
    sheetContentContainer: {
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sheetAnimatedIcon: {
      flexGrow: 1,
      width: 160,
      height: 160,
    },
  });

export default BackupScreen;
