import React, {
  forwardRef,
  useEffect,
  // useState,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  // useCallback,
} from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFormik } from 'formik';
import {
  TextInput,
  StyleSheet,
  View,
  // TouchableOpacity,
  // TouchableOpacity,
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
import { Report, ReportSaved } from '../../models';
import {
  doAddReport,
  // doDeleteAllReports,
  doEditReportById,
} from '../../store/reports/reportsService';
import Theme from '../../theme';
import StopWatchButton, {
  StopWatchButtonRef,
} from '../buttons/StopWatchButton';
import {
  doStopwatchStart,
  doStopwatchStop,
} from '../../store/stopwatch/stopwatchService';
import { useSelector } from 'react-redux';
import { selectStopWatch } from '../../store/stopwatch/stopwatchSelectors';

export type ReportFormModeType = 'create' | 'edit' | 'stopwatch';

type Props = {
  reportData?: ReportSaved | null;
  hasAddButton: boolean;
  headerButton?: boolean;
  initialDate?: Date;
};

export type ReportFormRef = {
  open: () => void;
  close: () => void;
};

const ReportForm = forwardRef<ReportFormRef, Props>((props, ref) => {
  const {
    reportData = null,
    hasAddButton,
    headerButton = false,
    initialDate = new Date(),
  } = props;
  const theme = useTheme<Theme>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const stopwatchData = useSelector(selectStopWatch());

  const [formMode, setFormMode] = useState<ReportFormModeType>('create');

  // BottomSheetModal Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['90%'], []);

  // animation width
  const [width, setWidth] = useState<number | null>(null);

  const stopWatchButtonRef = useRef<StopWatchButtonRef>(null);

  // useEffect(() => {
  //   console.log('stopwatchData ---------->', stopwatchData);

  useEffect(() => {
    if (
      formMode === 'stopwatch' &&
      stopWatchButtonRef.current?.mode === 'off'
    ) {
      console.log('formMode', stopWatchButtonRef.current?.mode);
      stopWatchButtonRef.current?.on();
    }
    console.log('formMode', stopWatchButtonRef.current?.mode);
    console.log('formMode general', formMode);
  }, []);

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
      if (formMode === 'create') {
        const newReport: Report = {
          ...values,
        };
        doAddReport(dispatch, newReport);
        bottomSheetModalRef.current?.close();
      } else if (formMode === 'edit' && !!reportData) {
        const editReport: ReportSaved = {
          ...values,
          id: reportData.id,
        };
        doEditReportById(dispatch, {
          year: new Date(editReport.date).getFullYear(),
          month: new Date(editReport.date).getMonth(),
          report: editReport,
        });
        bottomSheetModalRef.current?.close();
      }
    },
  });

  const handlePresentModalPress = () => open();

  const handleStopWatchButton = () => {
    stopWatchButtonRef.current?.mode === 'off'
      ? setStopWatchOn()
      : setStopWatchOff();
  };

  const setFieldReportData = (report: ReportSaved | null) => {
    if (report) {
      if (report?.id != null) {
        setFieldValue('title', report.title);
        setFieldValue('date', new Date(report.date).toISOString());
        setFieldValue('hours', report.hours);
        setFieldValue('minutes', report.minutes);
        setFieldValue('publications', report.publications);
        setFieldValue('videos', report.videos);
        setFieldValue('returnVisits', report.returnVisits);
        setFieldValue('bibleStudies', report.bibleStudies);
        setFieldValue('specialHours', report.specialHours);
        setFieldValue('specialMinutes', report.specialMinutes);
      } else {
        ReportSchema.fields.date.max(new Date());
        setFieldValue('title', '');
        setFieldValue('date', initialDate.toISOString());
        setFieldValue('hours', 0);
        setFieldValue('minutes', 0);
        setFieldValue('publications', 0);
        setFieldValue('videos', 0);
        setFieldValue('returnVisits', 0);
        setFieldValue('bibleStudies', 0);
        setFieldValue('specialHours', 0);
        setFieldValue('specialMinutes', 0);
      }
    }
  };

  useEffect(() => {
    if (reportData) {
      setFormMode('edit');
    }
  }, [reportData]);

  const open = () => {
    setFieldReportData(reportData);
    bottomSheetModalRef.current?.present();
  };

  const close = () => {};

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
  }));

  const setStopWatchOn = () => {
    stopWatchButtonRef.current?.on();
    setFormMode('stopwatch');

    doStopwatchStart(dispatch);
  };

  const setStopWatchOff = () => {
    stopWatchButtonRef.current?.off();
    setFormMode('create');

    doStopwatchStop(dispatch);
  };

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
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <View
          onLayout={(event) => {
            if (event.nativeEvent.layout.width > 0) {
              setWidth(event.nativeEvent.layout.width);
            }
          }}
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
            isEdit={formMode === 'edit'}
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
          {/* <TouchableOpacity onPress={() => doDeleteAllReports(dispatch)}>
          <Text>{t('Delete')}</Text>
        </TouchableOpacity> */}
        </View>
        {!!width && width > 0 ? (
          <View style={styles(theme).sheetButtonsContainer}>
            {formMode !== 'edit' ? (
              <StopWatchButton
                ref={stopWatchButtonRef}
                onPress={() => {
                  handleStopWatchButton();
                }}
                outsideBlockWidth={width}
              />
            ) : (
              <></>
            )}
            <MainButton
              icon={
                formMode === 'create' || formMode === 'edit'
                  ? 'checkmark'
                  : 'pause-outline'
              }
              style={{ backgroundColor: theme.colors.cardItemColor }}
              onPress={() => {
                handleSubmit();
              }}
              disabled={formMode === 'create' ?? !isValid}
              marginLeft
            />
          </View>
        ) : (
          <></>
        )}
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
