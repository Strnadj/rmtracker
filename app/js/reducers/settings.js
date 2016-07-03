import { SET_URL, SET_TOKEN } from '../actions/settings'

export default function counter(state = 0, action) {
  switch (action.type) {
    case SET_URL:
      return state + 1
    case SET_TOKEN:
      return state - 1
    default:
      return state
  }
}
