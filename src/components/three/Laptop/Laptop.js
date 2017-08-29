import React, { Component } from 'react';
import injectSheet from 'react-jss';
import createLaptop from './LaptopThree';

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

class Laptop extends Component {
  componentDidMount() {
    const laptop = createLaptop(this.element);
    laptop.init();
    laptop.animate();
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root} ref={e => (this.element = e)} />;
  }
}

export default injectSheet(styles)(Laptop);
