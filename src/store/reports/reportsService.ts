import { Dispatch } from 'redux';
import {
  Backup,
  Report,
  ReportDeleteByIdInput,
  ReportEditByIdInput,
  ReportPassRemainingHoursInput,
  ReportRoundedState,
  ReportRoundMinutes,
  ReportUpdateStateReportRoundedState,
} from '../../models';
import {
  addReport,
  calculateMinutesPassed,
  deleteAllReports,
  deleteReportById,
  editReportById,
  updateReportRoundedState,
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
      specialMinutes: params.spetialMinutesPassed,
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
      specialMinutes: 0 - params.spetialMinutesPassed,
    };
    doAddReport(dispatch, reportCurrentMonth);
    doAddReport(dispatch, reportPastMonth);
    doUpdateReportRoundedState(dispatch, {
      year: reportPastDate.getFullYear(),
      month: reportPastDate.getMonth(),
      reportRoundedState: ReportRoundedState.PASSED,
    });
  } catch (e) {
    console.log(e);
  }
}

export function doRoundRemainingHours(
  dispatch: Dispatch,
  params: ReportRoundMinutes
) {
  try {
    const reportCurrentDate = new Date(params.year, params.month + 1, 0);
    const remainingMinutes = 60 - params.minutesPassed;
    const remainingSpecialMinutes = 60 - params.spetialMinutesPassed;

    if (params.reportRoundedState === ReportRoundedState.ROUNDED_UP) {
      const reportRoundRemaining: Report = {
        title: '[Minutes Rounded]',
        date: reportCurrentDate.toISOString(),
        hours: 0,
        minutes: remainingMinutes,
        publications: 0,
        videos: 0,
        returnVisits: 0,
        bibleStudies: 0,
        specialHours: 0,
        specialMinutes: remainingSpecialMinutes,
      };
      doAddReport(dispatch, reportRoundRemaining);
    } else if (params.reportRoundedState === ReportRoundedState.ROUNDED_DOWN) {
      const reportRoundRemaining: Report = {
        title: '[Minutes Rounded]',
        date: reportCurrentDate.toISOString(),
        hours: 0,
        minutes: 0 - remainingMinutes,
        publications: 0,
        videos: 0,
        returnVisits: 0,
        bibleStudies: 0,
        specialHours: 0,
        specialMinutes: 0 - remainingSpecialMinutes,
      };
      doAddReport(dispatch, reportRoundRemaining);
    }
  } catch (e) {
    console.log(e);
  }
}

export function doUpdateReportRoundedState(
  dispatch: Dispatch,
  params: ReportUpdateStateReportRoundedState
) {
  try {
    dispatch(updateReportRoundedState(params));
  } catch (e) {
    console.log(e);
  }
}
