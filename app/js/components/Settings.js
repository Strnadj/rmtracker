import React, { Component, PropTypes } from 'react'
import { Box, TextInput, Button } from 'react-desktop/macOs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/settings'

class Settings extends Component {
  static propTypes = {
    setSettings: PropTypes.func.isRequired,
    url: PropTypes.string,
    token: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      url: props.url,
      token: props.token
    }
  }

  saveSettings = (e) => {
    e.preventDefault()

    this.props.setSettings({
      url: this.state.url,
      token: this.state.token
    })
  }

  setUrl = (e) => {
    this.setState({
      url: e.target.value
    })
  }

  setToken = (e) => {
    this.setState({
      token: e.target.value
    })
  }

  render() {
    const { url, token } = this.state

    return (
      <div>
        <Box label='Redmine Configuration' padding='10px 10px'>
          <TextInput ref='input' label='Url' defaultValue={url} onChange={this.setUrl} />
          <TextInput ref='input' label='Token' defaultValue={token} margin='10px 0px' onChange={this.setToken} />

          <div className='testSettings'>
            <Button onClick={this.saveSettings}>
              Test settings
            </Button>
          </div>
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const settings = state.get('settings')

  return {
    url: settings.get('url'),
    token: settings.get('token')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSettings: bindActionCreators(actionCreators.setSettings, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
