import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/macOs'

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    blockUi: PropTypes.bool,
    blockMessage: PropTypes.string
  };

  render() {
    let overlayBody = null

    if (this.props.blockUi) {
      overlayBody = (
        <div className="overlay">
          <div>
            <ProgressCircle/>
            {this.props.blockMessage}
          </div>
        </div>
      )
    }

    return (
      <div>
        {overlayBody}
        <div className='topbar'>
          <h1>Redmine Tracker</h1>
          <div className='buttons'>
            <Link to="/" className="pe-7s-home"></Link>
            <Link to="/settings" className="pe-7s-config"></Link>
          </div>
        </div>
        <div className='body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const ui = state.get('ui')

  return {
    blockUi: ui.get('blockUi'),
    blockMessage: ui.get('blockMessage')
  }
}

export default connect(mapStateToProps)(App)
