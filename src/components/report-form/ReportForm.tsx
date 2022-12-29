import React, { forwardRef, useState, useImperativeHandle, useMemo, useRef, useCallback } from 'react';
import { useFormik } from 'formik';
import { ReportSchema } from '../form-validation/validation';
import AddReportButton from '../buttons/AddReportButton';
import BottomSheetModalComp from '../BottomSheetModalComp';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

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

  const [datePicker, setDatePicker] = useState<Date>(new Date());
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  // BottomSheetModal Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['85%'], []);

  // Formik form
  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
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
    },
    onSubmit: () => {},
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
      />
    </>
  );
});

export default ReportForm;
