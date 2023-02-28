import React, {
  forwardRef,
  // useState,
  useImperativeHandle,
  useMemo,
  useRef,
  // useCallback,
  useEffect,
} from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFormik } from 'formik';
import {
  TextInput,
  StyleSheet,
  View,
  // Text,
  // TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';

import { ReportSchema } from '../form-validation/validation';
import AddReportButton from '../buttons/AddReportButton';
import BottomSheetModalComp from '../BottomSheetModalComp';
import ReportFormItem from './ReportFormItem';
import MainButton from '../buttons/MainButton';
import { useDispatch } from 'react-redux';
// import { addReport } from '../../store/slices/reportsSlice';
import { Report } from '../../models';
import {
  doAddReport,
  // doDeleteAllReports,
  doEditReportById,
} from '../../store/reports/reportsService';
import { useSelector } from 'react-redux';
import { selectAllReports } from '../../store/reports/reportsSelectors';
import { ReportStorage } from '../../store/reports/reportsState';
import Theme from '../../theme';

type Props = {
  reportData?: ReportStorage | null;
  hasAddButton: boolean;
  headerButton?: boolean;
};

export type ReportFormRef = {
  open: () => void;
  close: () => void;
};

const ReportForm = forwardRef<ReportFormRef, Props>((props, ref) => {
  const { reportData = null, hasAddButton, headerButton = false } = props;
  const theme = useTheme<Theme>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const allReports = useSelector(selectAllReports());

  const formMode = reportData === null ? 'create' : 'edit';

  // BottomSheetModal Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['90%'], []);

  // Formik form
  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    // setValues,
    // handleBlur,
    values,
    // errors,
    // touched,
    isValid,
  } = useFormik({
    validationSchema: ReportSchema,
    initialValues: {
      title: '',
      date: new Date().toISOString(),
      hours: 0,
      minutes: 0,
      publications: 0,
      videos: 0,
      returnVisits: 0,
      bibleStudies: 0,
      specialHours: 0,
      specialMinutes: 0,
    },
    onSubmit: () => {
      console.log('123', formMode);
      if (formMode === 'create') {
        const newReport: Report = {
          ...values,
        };
        doAddReport(dispatch, newReport);
        bottomSheetModalRef.current?.close();
      } else if (formMode === 'edit' && !!reportData) {
        const editReport: ReportStorage = {
          ...values,
          id: reportData.id,
        };
        doEditReportById(dispatch, editReport);
        bottomSheetModalRef.current?.close();
      }
    },
  });

  const handlePresentModalPress = () => open();

  const setFieldReportData = () => {
    if (reportData?.id != null && formMode === 'edit') {
      setFieldValue('title', reportData.title);
      setFieldValue('date', new Date(reportData.date).toISOString());
      setFieldValue('hours', reportData.hours);
      setFieldValue('minutes', reportData.minutes);
      setFieldValue('publications', reportData.publications);
      setFieldValue('returnVisits', reportData.returnVisits);
      setFieldValue('bibleStudies', reportData.bibleStudies);
      setFieldValue('specialHours', reportData.specialHours);
      setFieldValue('specialMinutes', reportData.specialMinutes);
    } else {
      ReportSchema.fields.date.max(new Date());
      setFieldValue('title', '');
      setFieldValue('date', new Date().toISOString());
      setFieldValue('hours', 0);
      setFieldValue('minutes', 0);
      setFieldValue('publications', 0);
      setFieldValue('returnVisits', 0);
      setFieldValue('bibleStudies', 0);
      setFieldValue('specialHours', 0);
      setFieldValue('specialMinutes', 0);
    }
  };

  const open = () => {
    console.log('open');
    setFieldReportData();
    bottomSheetModalRef.current?.present();
  };

  const close = () => {};

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
  }));

  useEffect(() => {
    // console.log(allReports);
  }, [allReports]);

  return (
    <>
      {hasAddButton && (
        <AddReportButton
          onPress={handlePresentModalPress}
          headerButton={headerButton}
        />
      )}

      <BottomSheetModalComp
        innerRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        containerStyle={styles(theme).sheetContainer}
      >
        <TextInput
          style={styles(theme).reportTitleinput}
          onChangeText={handleChange('title')}
          value={values.title}
          placeholder={`${t('Add a title')}...`}
          placeholderTextColor={theme.colors.secondaryTextColor}
        />
        <ReportFormItem
          type="date"
          title={t('Date')}
          onChange={(v) => setFieldValue('date', v)}
          value={values.date}
          marginB
        />
        <ReportFormItem
          type="number"
          title={t('Hours')}
          icon="time-outline"
          value={values.hours}
          onChange={(v) => setFieldValue('hours', v)}
        />
        <ReportFormItem
          type="number"
          title={t('Minutes')}
          icon="time-outline"
          value={values.minutes}
          onChange={(v) => setFieldValue('minutes', v)}
          diffOnChange={5}
          marginB
          isMinutes
        />
        <ReportFormItem
          type="number"
          title={t('Publications')}
          icon="library-outline"
          value={values.publications}
          onChange={(v) => setFieldValue('publications', v)}
        />
        <ReportFormItem
          type="number"
          title={t('Videos')}
          icon="play-outline"
          value={values.videos}
          onChange={(v) => setFieldValue('videos', v)}
        />
        <ReportFormItem
          type="number"
          title={t('Return Visits')}
          icon="chatbubbles-outline"
          value={values.returnVisits}
          onChange={(v) => setFieldValue('returnVisits', v)}
        />
        <ReportFormItem
          type="number"
          title={t('Bible Studies')}
          icon="people-outline"
          value={values.bibleStudies}
          onChange={(v) => setFieldValue('bibleStudies', v)}
          marginB
        />
        <ReportFormItem
          type="number"
          title={t('Special Hours')}
          icon="time-outline"
          value={values.specialHours}
          onChange={(v) => setFieldValue('specialHours', v)}
        />
        <ReportFormItem
          type="number"
          title={t('Special Minutes')}
          icon="time-outline"
          value={values.specialMinutes}
          onChange={(v) => setFieldValue('specialMinutes', v)}
          diffOnChange={5}
          marginB
          isMinutes
        />

        <View style={styles(theme).sheetButtonsContainer}>
          <MainButton
            icon="checkmark"
            style={{ backgroundColor: theme.colors.cardItemColor }}
            onPress={() => {
              handleSubmit();
            }}
            disabled={!isValid}
          />
        </View>
        {/* <TouchableOpacity onPress={() => doDeleteAllReports(dispatch)}>
          <Text>{t('Delete')}</Text>
        </TouchableOpacity> */}
      </BottomSheetModalComp>
    </>
  );
});

export default ReportForm;

const styles = (theme: Theme) =>
  StyleSheet.create({
    sheetContainer: {
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 45,
    },
    reportTitleinput: {
      marginBottom: 20,
      fontSize: 22,
      lineHeight: 30,
      color: theme.colors.textColor,
    },
    sheetButtonsContainer: {
      flexDirection: 'row',
    },
  });
