import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
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
