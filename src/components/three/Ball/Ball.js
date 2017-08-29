import React, { Component } from 'react';
import injectSheet from 'react-jss';
import createBall from './BallThree';

const styles = {
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    top: '0px'
    // pointerEvents: 'none',
  }
};

class Ball extends Component {
  componentDidMount() {
    const ball = createBall(this.element);
    ball.init();
    ball.animate();
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root} ref={e => (this.element = e)} />;
  }
}

export default injectSheet(styles)(Ball);
