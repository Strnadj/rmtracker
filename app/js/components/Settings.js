import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Box, Text, TextInput, Button } from 'react-desktop/macOs'

class Settings extends Component {
  static propTypes = {
    setToken: PropTypes.func.isRequired,
    setUrl: PropTypes.func.isRequired,
    checkSettings: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <Box label='Redmine Configuration' padding='10px 10px'>
          <TextInput ref='input' label='Url' placeholder='http://redmine.org/' />
          <TextInput ref='input' label='Token' placeholder='ADLKJSDF2930302' margin='10px 0px' />

          <div className='testSettings'>
            <Button onClick={() => console.log('Test')}>
              Test settings
            </Button>
          </div>
        </Box>
      </div>
    );
   //const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
   //return (
   //  <div>
   //    <div className={styles.backButton}>
   //      <Link to="/">
   //        <i className="fa fa-arrow-left fa-3x" />
   //      </Link>
   //    </div>
   //    <div className={`counter ${styles.counter}`}>
   //      {counter}
   //    </div>
   //    <div className={styles.btnGroup}>
   //      <button className={styles.btn} onClick={increment}>
   //        <i className="fa fa-plus"></i>
   //      </button>
   //      <button className={styles.btn} onClick={decrement}>
   //        <i className="fa fa-minus"></i>
   //      </button>
   //      <button className={styles.btn} onClick={incrementIfOdd}>odd</button>
   //      <button className={styles.btn} onClick={() => incrementAsync()}>async</button>
   //    </div>
   //  </div>
   //);
  }
}

export default Settings;
