import { Dispatch } from 'redux';
import {
  Backup,
  Report,
  ReportDeleteByIdInput,
  ReportEditByIdInput,
} from '../../models';
import {
  addReport,
  deleteAllReports,
  deleteReportById,
  editReportById,
  uploadBackup,
} from './reportsSlice';

export function doAddReport(dispatch: Dispatch, report: Report) {
  try {
    dispatch(addReport(report));
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
