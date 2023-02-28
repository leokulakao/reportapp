import { Dispatch } from 'redux';
import { Report, ReportDeleteByIdInput } from '../../models';
import {
  addReport,
  deleteAllReports,
  deleteReportByIdNew,
  editReportById,
  uploadBackup,
} from './reportsSlice';
import { ReportStorage } from './reportsState';

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
    dispatch(deleteReportByIdNew(params));
  } catch (e) {
    console.log(e);
  }
}

export function doEditReportById(dispatch: Dispatch, report: ReportStorage) {
  try {
    dispatch(editReportById(report));
  } catch (e) {
    console.log(e);
  }
}

export function doUploadBackup(dispatch: Dispatch, reports: ReportStorage[]) {
  try {
    dispatch(uploadBackup(reports));
  } catch (e) {
    console.log(e);
  }
}
