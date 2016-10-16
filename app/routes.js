import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Containers
import App from './containers/App'
import HomePage from './containers/HomePage'
import SettingsPage from './containers/SettingsPage'

// Main app
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
)
