import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Backup,
  Report,
  ReportDeleteByIdInput,
  ReportEditByIdInput,
  ReportSaved,
  ReportsDataMonths,
  ReportsDataYear,
} from '../../models';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { ReportsState } from './reportsState';

const initialState: ReportsState = {
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

      console.log(JSON.stringify(state.data, null, 2));
    },

    deleteAllReports: (state: ReportsState) => {
      state.data.years = {};
    },

    deleteReportById: (
      state: ReportsState,
      action: PayloadAction<ReportDeleteByIdInput>
    ) => {
      const payload = action.payload;
      if (state.data.years[payload.year]) {
        if (Object.keys(state.data.years[payload.year].months).length > 1) {
          if (state.data.years[payload.year]?.months[payload.month]) {
            if (
              state.data.years[payload.year]?.months[payload.month].reports
                .length > 1
            ) {
              state.data.years[payload.year].months[payload.month].reports =
                state.data.years[payload.year]?.months[
                  payload.month
                ]?.reports.filter((report: ReportSaved) => {
                  if (report.id !== payload.report.id) {
                    return report;
                  }
                });
            } else {
              delete state.data.years[payload.year]?.months[payload.month];
            }
          }
        } else {
          if (
            state.data.years[payload.year]?.months[payload.month] &&
            state.data.years[payload.year]?.months[payload.month].reports
              .length > 1
          ) {
            state.data.years[payload.year].months[payload.month].reports =
              state.data.years[payload.year]?.months[
                payload.month
              ]?.reports.filter((report: ReportSaved) => {
                if (report.id !== payload.report.id) {
                  return report;
                }
              });
          } else {
            delete state.data.years[payload.year];
          }
        }
      }
      console.log(JSON.stringify(state.data, null, 2));
    },

    editReportById: (
      state: ReportsState,
      action: PayloadAction<ReportEditByIdInput>
    ) => {
      const payload = action.payload;
      if (state.data.years[payload.year]) {
        if (state.data.years[payload.year]?.months[payload.month]) {
          for (
            let index = 0;
            index <
            state.data.years[payload.year]?.months[payload.month]?.reports
              .length;
            index++
          ) {
            if (
              state.data.years[payload.year].months[payload.month].reports[
                index
              ].id === payload.report.id
            ) {
              state.data.years[payload.year].months[payload.month].reports[
                index
              ] = payload.report;
            }
          }
        }
      }
      console.log(JSON.stringify(state.data, null, 2));
    },

    uploadBackup: (state: ReportsState, action: PayloadAction<Backup>) => {
      state.data = action.payload.data;
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
