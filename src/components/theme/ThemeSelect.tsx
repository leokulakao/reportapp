import { useTheme } from '@shopify/restyle';
import React, { forwardRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeState } from '../../store/app/appSelectors';
import { doChangeThemeState } from '../../store/app/appService';
import { ThemeNames } from '../../theme';

import BottomSheetSelect from '../bottomSheetSelect/BottomSheetSelect';
import BottomSheetSelectItem from '../bottomSheetSelect/BottomSheetSelectItem';

type Props = {
  ref: any;
};

const THEMES: ThemeNames[] = ['light', 'dark'];

const ThemeSelect: React.FC<Props> = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const theme = useSelector(selectThemeState());

  return (
    <BottomSheetSelect ref={ref}>
      {THEMES.map((item: ThemeNames, index: number) => (
        <BottomSheetSelectItem
          item={item}
          isActive={theme === item}
          onPress={() => doChangeThemeState(dispatch, item)}
          key={index}
        />
      ))}
    </BottomSheetSelect>
  );
});

export default ThemeSelect;
