import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components and actions
import Settings from '../components/Settings'
import * as SettingsActions from '../actions/Settings'

function mapStateToProps(state) {
  return {
    redmine_url: state.redmine_url,
    redmine_token: state.redmine_token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
