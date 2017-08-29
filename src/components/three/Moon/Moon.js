import React, { Component } from 'react';
import injectSheet from 'react-jss';
import createMoon from './MoonThree';

const styles = {
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    top: '0px',
    pointerEvents: 'none'
  }
};

class Moon extends Component {
  componentDidMount() {
    const moon = createMoon(this.element);
    moon.init();
    moon.animate();
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root} ref={e => (this.element = e)} />;
  }
}

export default injectSheet(styles)(Moon);
