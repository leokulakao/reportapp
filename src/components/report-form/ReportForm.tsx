import React, {
  forwardRef,
  // useState,
  useImperativeHandle,
  useMemo,
  useRef,
  // useCallback,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import { ReportSchema } from '../form-validation/validation';
import AddReportButton from '../buttons/AddReportButton';
import BottomSheetModalComp from '../BottomSheetModalComp';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ReportFormItem from './ReportFormItem';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MainButton from '../buttons/MainButton';
import { useDispatch } from 'react-redux';
// import { addReport } from '../../store/slices/reportsSlice';
import { Report } from '../../models';
import {
  doAddReport,
  doDeleteAllReports,
} from '../../store/reports/reportsService';
import { useSelector } from 'react-redux';
import { selectAllReports } from '../../store/reports/reportsSelectors';
import { ReportStorage } from '../../store/reports/reportsState';

type Props = {
  reportData?: ReportStorage;
  hasAddButton: boolean;
};

type PropsForwardedRef = {
  open: () => void;
  close: () => void;
};

const ReportForm = forwardRef<PropsForwardedRef, Props>((props, ref) => {
  const { reportData, hasAddButton } = props;

  const dispatch = useDispatch();

  const allReports = useSelector(selectAllReports());

  const formMode = reportData === null ? 'create' : 'edit';

  // BottomSheetModal Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['85%'], []);

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
    // isValid,
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
      const newReport: Report = {
        ...values,
      };
      doAddReport(dispatch, newReport);
      bottomSheetModalRef.current?.close();
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
    } else {
      ReportSchema.fields.date.max(new Date());
      setFieldValue('title', '');
      setFieldValue('date', new Date().toISOString());
      setFieldValue('hours', 0);
      setFieldValue('minutes', 0);
      setFieldValue('publications', 0);
      setFieldValue('returnVisits', 0);
      setFieldValue('bibleStudies', 0);
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
      {hasAddButton && <AddReportButton onPress={handlePresentModalPress} />}
      <BottomSheetModalComp
        innerRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        containerStyle={styles.sheetContainer}
      >
        <TextInput
          style={styles.reportTitleinput}
          onChangeText={handleChange('title')}
          value={values.title}
          placeholder={`Add a title...`}
        />
        <ReportFormItem
          type="date"
          title="Date"
          onChange={(v) => setFieldValue('date', v)}
          value={values.date}
          marginB
        />
        <ReportFormItem
          type="number"
          title="Hours"
          icon="time-outline"
          value={values.hours}
          onChange={(v) => setFieldValue('hours', v)}
        />
        <ReportFormItem
          type="number"
          title="Minutes"
          icon="time-outline"
          value={values.minutes}
          onChange={(v) => setFieldValue('minutes', v)}
          diffOnChange={5}
          marginB
          isMinutes
        />
        <ReportFormItem
          type="number"
          title="Publications"
          icon="library-outline"
          value={values.publications}
          onChange={(v) => setFieldValue('publications', v)}
        />
        <ReportFormItem
          type="number"
          title="Videos"
          icon="play-outline"
          value={values.videos}
          onChange={(v) => setFieldValue('videos', v)}
        />
        <ReportFormItem
          type="number"
          title="Return Visits"
          icon="chatbubbles-outline"
          value={values.returnVisits}
          onChange={(v) => setFieldValue('returnVisits', v)}
        />
        <ReportFormItem
          type="number"
          title="Bible Studies"
          icon="people-outline"
          value={values.bibleStudies}
          onChange={(v) => setFieldValue('bibleStudies', v)}
          marginB
        />
        <ReportFormItem
          type="number"
          title="Special Hours"
          icon="time-outline"
          value={values.specialHours}
          onChange={(v) => setFieldValue('specialHours', v)}
        />
        <ReportFormItem
          type="number"
          title="Special Minutes"
          icon="time-outline"
          value={values.specialMinutes}
          onChange={(v) => setFieldValue('specialMinutes', v)}
          diffOnChange={5}
          marginB
          isMinutes
        />

        <View style={styles.sheetButtonsContainer}>
          <MainButton icon="checkmark" onPress={() => handleSubmit()} />
        </View>
        <TouchableOpacity onPress={() => doDeleteAllReports(dispatch)}>
          <Text>Borrar</Text>
        </TouchableOpacity>
      </BottomSheetModalComp>
    </>
  );
});

export default ReportForm;

const styles = StyleSheet.create({
  sheetContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 45,
  },
  reportTitleinput: {
    marginBottom: 25,
    fontSize: 24,
    lineHeight: 30,
  },
  sheetButtonsContainer: {
    flexDirection: 'row',
  },
});
