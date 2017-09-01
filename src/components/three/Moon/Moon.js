import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
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
    this.handleLightAnimate();
  }

  componentWillUnmount() {
    this.moon = null;
  }

  handlePrimaryLightPosition = (x, y, z) =>
    this.setState({ primaryLightX: x, primaryLightY: y, primaryLightZ: z });

  handleLightAnimate = () => {
    const time = Date.now() / 500;
    const x = Math.sin(time);
    const z = Math.cos(time);
    this.setState({
      primaryLightX: x,
      primaryLightZ: z
    });
    requestAnimationFrame(this.handleLightAnimate);
  };

  render() {
    const { classes } = this.props;
    const { primaryLightX, primaryLightY, primaryLightZ } = this.state;
    const { cameraX, cameraY, cameraZ } = this.state;
    const moon = this.moon && this.moon;
    const classNames = classnames({
      [classes.root]: true,
      [classes.done]: this.state.done
    });

    moon &&
      moon.setPrimaryLightPosition(primaryLightX, primaryLightY, primaryLightZ);

    moon && moon.setCameraPosition(cameraX, cameraY, cameraZ);

    return (
      <Motion
        style={{
          cameraX: spring(this.state.cameraX),
          cameraY: spring(this.state.cameraY),
          cameraZ: spring(this.state.cameraZ)
        }}
      >
        {({
          cameraX,
          cameraY,
          cameraZ,
          primaryLightX,
          primaryLightY,
          primaryLightZ
        }) => {
          moon && moon.setCameraPosition(cameraX, cameraY, cameraZ);
          return <div className={classNames} ref={e => (this.element = e)} />;
        }}
      </Motion>
    );
  }
}

export default injectSheet(styles)(Moon);
