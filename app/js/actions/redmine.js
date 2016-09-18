import { SET_PROJECTS } from '../constants/actions'
import RedmineClient from '../utils/redmineClient'
import * as UiActions from './ui_actions'

// New redmine client
const client = new RedmineClient()

export function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    projects
  }
}

export function fetchProjects(data) {
  return dispatch => {
    // Block UI with message
    dispatch(UiActions.blockUi('Fetching projects'))

    // Get projects
    const projects = client.getProjects()

    // Set projects
    dispatch(setProjects(projects))
  }
}
