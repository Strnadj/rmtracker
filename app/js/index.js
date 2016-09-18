import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Immutable from 'immutable'
// import SettingsStorage from './utils/settingsStorage'

// App things
import routes from './routes'
import configureStore from './store/configureStore'

// Default state
const initialState = Immutable.fromJS({})

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
