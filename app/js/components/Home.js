import React, { Component } from 'react'
import { Box } from 'react-desktop/macOs'

const classNames = require('classnames')

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      counting: false,
      seconds: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeCounting = () => {
    this.setState({
      counting: !this.state.counting
    })
  }

  tick = () => {
    if (this.state.counting) {
      this.setState({
        seconds: this.state.seconds + 1
      })
    }
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
