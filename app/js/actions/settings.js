import * as UiActions from './ui_actions'
import { SAVE_SETTINGS } from '../constants/actions'
import client from '../utils/redmineClient'
import { fetchProjects } from './redmine'

export function saveSettings(url, token) {
  return {
    type: SAVE_SETTINGS,
    url,
    token
  }
}

export function setSettings(data) {
  return dispatch => {
    // Block UI with message
    dispatch(UiActions.blockUi('Test settings'))

    // Set connection settings
    dispatch(saveSettings(data.url, data.token))

    // Set connection to client
    client.setUrl(data.url)
    client.setToken(data.token)

    // Call client.getUser
    client.getUserInfo()

    // Try to fetch projects
    dispatch(fetchProjects())
  }
}
