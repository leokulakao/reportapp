import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { useFormik } from 'formik';
import { ReportSchema } from '../form-validation/validation';
import AddReportButton from '../buttons/AddReportButton';
import BottomSheetModalComp from '../BottomSheetModalComp';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ReportFormItem from './ReportFormItem';
import { TextInput, StyleSheet, View } from 'react-native';
import MainButton from '../buttons/MainButton';

type Props = {
  reportsData?: any | null;
  hasAddButton: boolean;
};

type PropsForwardedRef = {
  open: () => void;
  close: () => void;
};

const ReportForm = forwardRef<PropsForwardedRef, Props>((props, ref) => {
  const { reportsData, hasAddButton } = props;

  const formMode = reportsData === null ? 'create' : 'edit';

  // BottomSheetModal Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['85%'], []);

  // Formik form
  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    // handleBlur,
    values,
    errors,
    touched,
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
      console.log('evented', values);
    },
  });

  const handlePresentModalPress = useCallback(() => open(), []);

  const open = () => {
    console.log('open');
    bottomSheetModalRef.current?.present();
  };

  const close = () => {};

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
  }));

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
          onChange={handleChange('date')}
          value={new Date()}
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
