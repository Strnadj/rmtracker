import { combineReducers } from 'redux-immutable'

import ui from './ui'
import settings from './settings'
import routing from './routing'

const rootReducer = combineReducers({
  settings,
  ui,
  routing
})

export default rootReducer
