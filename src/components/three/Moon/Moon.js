import React, { Component } from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import createMoon from './MoonThree';

const styles = {
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    top: '0px'
  },
  done: {
    pointerEvents: 'none'
  }
};

class Moon extends Component {
  state = {
    done: false,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1000,
    primaryLightX: -1,
    primaryLightY: 0,
    primaryLightZ: 0
  };

  componentDidMount() {
    this.moon = createMoon(this.element);
    this.moon.init();
    this.moon.animate();
  }

  componentWillUnmount() {
    this.moon = null;
  }

  handlePrimaryLightPosition = (x, y, z) =>
    this.setState({ primaryLightX: x, primaryLightY: y, primaryLightZ: z });

  render() {
    const { classes } = this.props;
    const { primaryLightX, primaryLightY, primaryLightZ } = this.state;
    const { cameraX, cameraY, cameraZ } = this.state;
    const classNames = classnames({
      [classes.root]: true,
      [classes.done]: this.state.done
    });

    this.moon &&
      this.moon.setPrimaryLightPosition(
        primaryLightX,
        primaryLightY,
        primaryLightZ
      );
    this.moon && this.moon.setCameraPosition(cameraX, cameraY, cameraZ);

    return <div className={classNames} ref={e => (this.element = e)} />;
  }
}

export default injectSheet(styles)(Moon);
