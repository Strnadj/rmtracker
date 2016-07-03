import React, { Component } from 'react'
import { Box } from 'react-desktop/macOs'

var classNames = require('classnames')

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      counting: false
    }

    this.changeCounting = this.changeCounting.bind(this)
  }

  changeCounting() {
    this.setState({
      counting: !this.state.counting
    })
  }

  render() {
    // Get class state
    var btnClass = classNames({
      'pe-7s-power': true,
      'counting': true,
      'running': this.state.counting
    })

    return (
      <div>
        <Box className='trackerBox'>
          <div className={btnClass} onClick={this.changeCounting}>
          </div>
        </Box>
        <div>
        </div>
      </div>
    );
  }
}
