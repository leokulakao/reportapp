import { combineReducers } from '@reduxjs/toolkit';

import appReducer from './app/appSlice';
import reportsReducer from './reports/reportsSlice';

const rootReducer = combineReducers({
  app: appReducer,
  reports: reportsReducer,
});

export default rootReducer;
