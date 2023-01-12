import React, { useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import BottomSheetModalComp from '../BottomSheetModalComp';
import Theme from '../../theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import LanguageFormItem from './LanguageFormItem';

type Props = {
  ref: any;
};

const LanguageForm: React.FC<Props> = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme<Theme>();

  // BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['35%'], []);

  //   const handlePresentModalPress = useCallback(() => {
  //     bottomSheetModalRef.current?.present();
  //   }, []);

  const open = () => {
    bottomSheetModalRef.current?.present();
  };

  const close = () => {
    bottomSheetModalRef.current?.close();
  };

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
  }));

  return (
    <>
      <BottomSheetModalComp
        innerRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        containerStyle={styles(theme).sheetContainer}
      >
        {i18n.options.fallbackLng ? (
          i18n.options.fallbackLng.map((lang: string) => (
            <LanguageFormItem langId={lang} key={lang} />
          ))
        ) : (
          <></>
        )}
      </BottomSheetModalComp>
    </>
  );
});

const styles = (theme: Theme) =>
  StyleSheet.create({
    sheetContainer: {
      // justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 45,
      paddingTop: 20,
      backgroundColor: theme.colors.backgroundColor,
    },
    reportTitleinput: {
      marginBottom: 25,
      fontSize: 24,
      lineHeight: 30,
    },
  });

export default LanguageForm;
