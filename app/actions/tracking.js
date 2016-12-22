import { START_TRACKING, STOP_TRACKING } from '../constants/actions';

export function startTracking(data) {
  return {
    type: START_TRACKING,
    data
  }
}

export function stopTracking(data) {
  return {
    type: STOP_TRACKING,
    data
  }
}
