import * as UiActions from './ui_actions'
import { SAVE_SETTINGS } from '../constants/actions'
import client from '../utils/redmineClient'
import { fetchProjects } from './redmine'
import SettingsStorage from '../utils/settingsStorage'

export function saveSettings(url, token) {
  return {
    type: SAVE_SETTINGS,
    url,
    token
  }
}

export function testSettings(data) {
  return dispatch => {
    // Block UI with message
    dispatch(UiActions.blockUi('Test settings'))

    // Save settings
    let promise = SettingsStorage.set('redmine', {
      url: data.url,
      token: data.token
    });

    promise.then(val => {
      // Set connection settings
      dispatch(saveSettings(data.url, data.token))

      // Set connection to client
      client.setUrl(data.url)
      client.setToken(data.token)

      // Try to fetch projects
      dispatch(fetchProjects('/'))
    });

    // nothing to do
  }
}
