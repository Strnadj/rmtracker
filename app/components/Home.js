import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box } from 'react-desktop/macOs';
import Select from 'react-select';

import { fetchProjects } from '../actions/redmine';
import styles from './Home.scss';

const classNames = require('classnames');

class Home extends Component {
  static propTypes = {
    projects: PropTypes.object,
    projectsFetched: PropTypes.bool,
    issues: PropTypes.object,
    active: PropTypes.object,
    entries: PropTypes.array
  };

  constructor() {
    super()

    this.state = {
      counting: false,
      seconds: 0,
      loadingExternaly: false
    }
  }

  loadProjectsIfRequired() {
    // Load first n-projects if required
    if (!this.props.projectsFetched) {
      this.props.dispatch(fetchProjects())
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
    this.loadProjectsIfRequired()
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

  // Load data when val > 3
  onInputChange = (val) => {
    if (val.length > 3) {
      // Loading externaly
      this.setState({
        loadingExternaly: true
      });

      // Fetch project query asynchronnously
      this.props.dispatch(fetchProjects(null, val))
    }
  }

  logChange = (val) => {
    console.log(`Select project: ${val.label}`)
  }

  render() {
    // Get class state
    const btnClass = classNames({
      'pe-7s-power': true,
      [styles.counter]: true,
      [styles.running]: this.state.counting
    })

    let projectOptions = null

    if (this.props.projectsFetched) {
      projectOptions = this.props.projects.map((value, key) => {
        return { value: key, label: value.get('name') }
      }).toArray()

      projectOptions = <Select
        value="one"
        onInputChange={this.onInputChange}
        isLoading={this.state.loadingExternaly}
        onChange={this.logChange}
        options={projectOptions}
      />
    }

    return (
      <div>
        <Box className={styles.trackerBox}>
          <div className={btnClass} onClick={this.changeCounting}>
          </div>
          <div className='timeInterval'>
            {this.state.seconds}
          </div>
          <div className={styles.trackerBox}>
            <label>Project:</label>
            {projectOptions}
          </div>
        </Box>
        <div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const redmine = state.get('redmine');

  return {
    projects: redmine.get('projects'),
    projectsFetched: redmine.get('projectsFetched'),
    issues: redmine.get('issues')
  }
}

export default connect(mapStateToProps)(Home);
