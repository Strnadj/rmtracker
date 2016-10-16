import Immutable from 'immutable'
import { SAVE_SETTINGS } from '../constants/actions'

const initialState = Immutable.fromJS({
  url: 'http://localhost:3000',
  token: '8db7017e015b5cf39f488100b4e278c4896b64c3'
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
