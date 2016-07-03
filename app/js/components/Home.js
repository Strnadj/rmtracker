import React, { Component } from 'react'
import { Box } from 'react-desktop/macOs'

var classNames = require('classnames')

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      counting: false,
      seconds: 0
    }

    this.changeCounting = this.changeCounting.bind(this)
  }

  changeCounting() {
    this.setState({
      counting: !this.state.counting
    })
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  tick() {
    if (this.state.counting) {
      this.setState({
        seconds: this.state.seconds + 1
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          <div className='timeInterval'>
            {this.state.seconds}
          </div>
        </Box>
        <div>
        </div>
      </div>
    );
  }
}
