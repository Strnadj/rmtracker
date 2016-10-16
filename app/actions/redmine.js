import { SET_PROJECTS } from '../constants/actions'
import client from '../utils/redmineClient'
import * as UiActions from './ui_actions'
import { routerActions } from 'react-router-redux'

export function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    projects
  }
}

export function fetchProjects(redirect) {
  return dispatch => {
    // Block UI with message
    dispatch(UiActions.blockUi('Fetching projects'))

    // Get projects
    client.getProjects().then(projects => {
      // Set projects
      dispatch(setProjects(projects))

      // redirect back
      if (redirect) {
        // Redirect
        dispatch(routerActions.push(redirect))
      }

      // Unblock
      dispatch(UiActions.unBlockUi())
    }, error => {
      // Redirect
      dispatch(routerActions.push('/settings'))

      // Unblock
      dispatch(UiActions.unBlockUi())
    })
  }
}
