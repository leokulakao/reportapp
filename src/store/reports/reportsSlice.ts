import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Report } from '../../models';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { ReportsState, ReportStorage } from './reportsState';

const initialState: ReportsState = {
  reports: [],
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state: ReportsState, action: PayloadAction<Report>) => {
      const payload = action.payload;
      const newReport: ReportStorage = {
        ...payload,
        id: uuidv4(),
      };
      state.reports.push(newReport);
    },

    deleteAllReports: (state: ReportsState) => {
      state.reports = [];
    },
  },
});

export const { addReport, deleteAllReports } = reportsSlice.actions;

export default reportsSlice.reducer;
