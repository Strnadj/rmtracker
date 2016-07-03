import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// App things
import routes from './routes'
import configureStore from './store/configureStore'

// Create store
const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

// Default render
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
