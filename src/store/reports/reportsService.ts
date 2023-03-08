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
    const reportCurrentDate = new Date(
      params.year,
      params.month,
      0
      // getDaysInMonth(params.month, params.year) - 1
    );

    var nextmonthfirstday = new Date(params.year, params.month, 1);
    const lastDayOfMonth = new Date(
      reportCurrentDate.getFullYear(),
      reportCurrentDate.getMonth(),
      0
    );
    const reportCurrentMonth: Report = {
      title: '',
      date: lastDayOfMonth.toISOString(),
      hours: 0,
      minutes: 0,
      publications: 0,
      videos: 0,
      returnVisits: 0,
      bibleStudies: 0,
      specialHours: 0,
      specialMinutes: 0,
    };
    console.log('-------> nextmonthfirstday', nextmonthfirstday);
    console.log('-------> current', reportCurrentMonth.date);
    // doAddReport(dispatch)
  } catch (e) {
    console.log(e);
  }
}
