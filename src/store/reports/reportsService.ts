import { Dispatch } from 'redux';
import { Report } from '../../models';
import {
  addReport,
  deleteAllReports,
  deleteReportById,
  editReportById,
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

export function doDeleteReportById(dispatch: Dispatch, id: string) {
  try {
    dispatch(deleteReportById(id));
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
