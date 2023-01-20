import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootState';
import { ReportsByDays, ReportsByMonth } from './reportsState';

const reports = (state: RootState) => state.reports.reports;

export const selectAllReports = () => createSelector(reports, (_) => _);
export const selectReportsByMonth = (year: number, month: number) =>
  createSelector(reports, (_) => {
    const _reports = _;
    const result: ReportsByMonth = {
      year: year,
      month: month,
      reportsByDays: [],
    };
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      const start = new Date(year, month, i, 24, 0, 0);
      const end = new Date(year, month, day, 24, 0, 0);
      const r = _reports
        // .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter((elem) => {
          const d = new Date(elem.date);
          return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
        });
      if (r.length > 0) {
        const _reportByDays: ReportsByDays = {
          year: year,
          month: month,
          day: day,
          start: start.toISOString(),
          end: end.toISOString(),
          reports: r,
        };
        result.reportsByDays.push(_reportByDays);
      }
    }
    // console.log(result);
    return result;
  });
