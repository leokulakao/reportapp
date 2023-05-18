import { combineReducers } from '@reduxjs/toolkit';

import appReducer from './app/appSlice';
import reportsReducer from './reports/reportsSlice';
import stopwatchReducer from './stopwatch/stopwatchSlice';

const rootReducer = combineReducers({
  app: appReducer,
  reports: reportsReducer,
  stopwatch: stopwatchReducer,
});

export default rootReducer;
