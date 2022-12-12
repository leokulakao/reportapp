import { combineReducers } from '@reduxjs/toolkit';

import appReducer from './slices/reportsSlice';

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
