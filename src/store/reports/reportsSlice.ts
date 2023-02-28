import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Report,
  ReportDeleteByIdInput,
  ReportSaved,
  ReportsDataMonths,
  ReportsDataYear,
} from '../../models';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { ReportsState, ReportStorage } from './reportsState';

const initialState: ReportsState = {
  reports: [],
  data: {
    years: {},
  },
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state: ReportsState, action: PayloadAction<Report>) => {
      const payload = action.payload;
      const report: ReportStorage = {
        ...payload,
        id: uuidv4(),
      };
      state.reports.push(report);

      const newReport: ReportSaved = {
        id: uuidv4(),
        ...payload,
      };

      // new version

      const currentYear = new Date(payload.date).getFullYear();
      const currentMonth = new Date(payload.date).getMonth();

      const currentYearOnDate = state.data.years[currentYear];

      // set new year
      if (!currentYearOnDate) {
        state.data.years[currentYear] = {
          year: currentYear,
          months: {},
        } as ReportsDataYear;
      }

      const currentMonthOnDate =
        state.data.years[currentYear].months[currentMonth];

      // set new month
      if (!currentMonthOnDate) {
        state.data.years[currentYear].months[currentMonth] = {
          year: currentYear,
          month: currentMonth,
          reports: [],
          reportRounded: false,
        } as ReportsDataMonths;
      }

      // set new report
      state.data.years[currentYear].months[currentMonth].reports.push(
        newReport
      );

      console.log(state.data);
    },

    deleteAllReports: (state: ReportsState) => {
      state.reports = [];
      state.data.years = {};
    },

    deleteReportById: (state: ReportsState, action: PayloadAction<string>) => {
      state.reports = state.reports.filter(
        (report) => report.id !== action.payload
      );
    },

    deleteReportByIdNew: (
      state: ReportsState,
      action: PayloadAction<ReportDeleteByIdInput>
    ) => {
      const payload = action.payload;
      if (state.data.years[payload.year]) {
        if (state.data.years[payload.year]?.months[payload.month]) {
          state.data.years[payload.year].months[payload.month].reports =
            state.data.years[payload.year]?.months[
              payload.month
            ]?.reports.filter((report: ReportSaved) => {
              if (report.id !== payload.report.id) {
                return report;
              }
            });
        }
      }
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
  deleteReportByIdNew,
  editReportById,
  uploadBackup,
} = reportsSlice.actions;

export default reportsSlice.reducer;
