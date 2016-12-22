import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Immutable from 'immutable'
import SettingsStorage from './utils/settingsStorage'
import client from './utils/redmineClient'

// Styles
import './app.global.scss'

// App things
import routes from './routes'
import configureStore from './store/configureStore'

// Get values
let settings = SettingsStorage.get('settings', {
  settings: {
    url: 'http://localhost:4000',
    token: '8db7017e015b5cf39f488100b4e278c4896b64c3'
  }
})

// Load settings
settings.then(value => {
  // Default state
  const initialState = Immutable.fromJS(value);

  // Set client settings
  client.setUrl(value.settings.url)
  client.setToken(value.settings.token)

  // Create store
  const store = configureStore(initialState)

  // Sync history with immutable
  const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState: (state) => {
      return state.get('routing').toObject()
    }
  })

  // Default render
  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  )
})
