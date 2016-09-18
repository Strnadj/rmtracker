import Immutable from 'immutable'
import { SAVE_SETTINGS } from '../constants/actions'

const initialState = Immutable.fromJS({
  url: 'http://localhost:3000',
  token: '5be4277f898319aba70beffc1703b09c744e616f'
})

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SAVE_SETTINGS:
      return state.merge({
        url: action.url,
        token: action.token
      })
    default:
      return state
  }
}
