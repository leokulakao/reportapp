import { Dispatch } from 'redux';
import { start, stop } from './stopwatchSlice';

export function doStopwatchStart(dispatch: Dispatch) {
  try {
    dispatch(start());
  } catch (e) {
    console.log(e);
  }
}

export function doStopwatchStop(dispatch: Dispatch) {
  try {
    dispatch(stop());
  } catch (e) {
    console.log(e);
  }
}
