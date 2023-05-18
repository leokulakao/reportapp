import { createSlice } from '@reduxjs/toolkit';
import { StopwatchState } from './stopwatchState';

const initialState: StopwatchState = {
  isStarted: false,
  cacheReport: {
    title: '',
    date: '',
    hours: 0,
    minutes: 0,
    publications: 0,
    videos: 0,
    returnVisits: 0,
    bibleStudies: 0,
    specialHours: 0,
    specialMinutes: 0,
  },
};

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    start: (state: StopwatchState) => {
      if (state.isStarted === true) {
        return;
      }
      state.isStarted = true;
      state.startDate = new Date().toISOString();
    },
    stop: (state: StopwatchState) => {
      if (state.isStarted === false) {
        return;
      }
      state.isStarted = false;
      state.endDate = new Date().toISOString();
    },
  },
});

export const { start, stop } = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
