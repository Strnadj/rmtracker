import { combineReducers } from 'redux-immutable'

import ui from './ui'
import settings from './settings'
import routing from './routing'
import redmine from './redmine'

const rootReducer = combineReducers({
  settings,
  ui,
  routing,
  redmine
})

export default rootReducer
