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

    deleteReportById: (state: ReportsState, action: PayloadAction<string>) => {
      state.reports = state.reports.filter(
        (report) => report.id !== action.payload
      );
    },

    editReportById: (
      state: ReportsState,
      action: PayloadAction<ReportStorage>
    ) => {
      for (let i = 0; i < state.reports.length; i++) {
        if (state.reports[i].id === action.payload.id) {
          state.reports[i] = action.payload;
        }
      }
    },

    uploadBackup: (
      state: ReportsState,
      action: PayloadAction<ReportStorage[]>
    ) => {
      state.reports = action.payload;
    },
  },
});

export const {
  addReport,
  deleteAllReports,
  deleteReportById,
  editReportById,
  uploadBackup,
} = reportsSlice.actions;

export default reportsSlice.reducer;
