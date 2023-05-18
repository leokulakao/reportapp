import { createSelector } from 'reselect';
import { Report } from '../../models';
import { RootState } from '../rootState';

const selectIsStarted = (state: RootState) => state.stopwatch.isStarted;
const selectCacheReport = (state: RootState) => state.stopwatch.cacheReport;

export const selectStopWatch = () =>
  createSelector(
    selectIsStarted,
    selectCacheReport,
    (isStarted: boolean, cacheReport: Report) => {
      const _isStarted = isStarted;
      const _cacheReport = cacheReport;
      return { _isStarted, _cacheReport };
    }
  );
