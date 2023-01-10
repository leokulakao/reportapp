import { createSelector } from '@reduxjs/toolkit';
import { ReportsState } from './reportsState';

const reports = (state: ReportsState) => state.reports;

export const selectAllReports = () => createSelector(reports, (_) => _);
