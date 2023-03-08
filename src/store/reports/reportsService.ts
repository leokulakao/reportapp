import { Dispatch } from 'redux';
import {
  Backup,
  Report,
  ReportDeleteByIdInput,
  ReportEditByIdInput,
  ReportPassRemainingHoursInput,
} from '../../models';
import {
  addReport,
  calculateMinutesPassed,
  deleteAllReports,
  deleteReportById,
  editReportById,
  uploadBackup,
} from './reportsSlice';

export function doAddReport(dispatch: Dispatch, report: Report) {
  try {
    dispatch(addReport(report));

    const currentYear = new Date(report.date).getFullYear();
    const currentMonth = new Date(report.date).getMonth();

    dispatch(
      calculateMinutesPassed({ year: currentYear, month: currentMonth })
    );
  } catch (e) {
    console.log(e);
  }
}

export function doDeleteAllReports(dispatch: Dispatch) {
  try {
    dispatch(deleteAllReports());
  } catch (e) {
    console.log(e);
  }
}

export function doDeleteReportById(
  dispatch: Dispatch,
  params: ReportDeleteByIdInput
) {
  try {
    dispatch(deleteReportById(params));
    dispatch(
      calculateMinutesPassed({ year: params.year, month: params.month })
    );
  } catch (e) {
    console.log(e);
  }
}

export function doEditReportById(
  dispatch: Dispatch,
  params: ReportEditByIdInput
) {
  try {
    dispatch(editReportById(params));
    dispatch(
      calculateMinutesPassed({ year: params.year, month: params.month })
    );
  } catch (e) {
    console.log(e);
  }
}

export function doUploadBackup(dispatch: Dispatch, backup: Backup) {
  try {
    dispatch(uploadBackup(backup));
  } catch (e) {
    console.log(e);
  }
}

export function doPassRemainingHours(
  dispatch: Dispatch,
  params: ReportPassRemainingHoursInput
) {
  try {
    console.log(params);
    const reportCurrentDate = new Date(params.year, params.month, 1);
    const reportPastDate = new Date(params.year, params.month, 0);

    const reportCurrentMonth: Report = {
      title: '[Minutes from past month]',
      date: reportCurrentDate.toISOString(),
      hours: 0,
      minutes: params.minutesPassed,
      publications: 0,
      videos: 0,
      returnVisits: 0,
      bibleStudies: 0,
      specialHours: 0,
      specialMinutes: 0,
    };

    const reportPastMonth: Report = {
      title: '[Minutes to next month]',
      date: reportPastDate.toISOString(),
      hours: 0,
      minutes: 0 - params.minutesPassed,
      publications: 0,
      videos: 0,
      returnVisits: 0,
      bibleStudies: 0,
      specialHours: 0,
      specialMinutes: 0,
    };
    doAddReport(dispatch, reportCurrentMonth);
    doAddReport(dispatch, reportPastMonth);
  } catch (e) {
    console.log(e);
  }
}
