import Immutable from 'immutable'
import { SET_PROJECTS } from '../constants/actions'

const initialState = Immutable.fromJS({
  projects: [],
  projectsFetched: false,
  issues: {}
})

export default function redmine(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return state.merge({
        projects: action.projects,
        projectsFetched: true
      })
    default:
      return state
  }
}
