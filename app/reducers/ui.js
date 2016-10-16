import Immutable from 'immutable'
import { BLOCK_UI, UN_BLOCK_UI } from '../constants/actions'

const initialState = Immutable.fromJS({
  blockUi: false,
  blockMessage: ''
})

export default function ui(state = initialState, action) {
  switch (action.type) {
    case BLOCK_UI:
      return state.merge({
        blockUi: true,
        blockMessage: action.message
      })
    case UN_BLOCK_UI:
      return state.set('blockUi', false)
    default:
      return state
  }
}
