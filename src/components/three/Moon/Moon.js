import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Clock } from 'three';
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

  animate = window.requestAnimationFrame.bind(window);

  componentWillMount() {
    this.theta = 0;
    this.clock = new Clock();
  }

  componentDidMount() {
    this.moon = createMoon(this.element);
    this.moon.init();
    this.moon.animate();
    this.clock.start();
    this.startAnimation();
    setTimeout(this.cameraAnimation, 2000);
  }

  componentWillUnmount() {
    this.moon = null;
    this.clock = null;
    this.theta = null;
  }

  handlePrimaryLightPosition = (
    primaryLightX: number,
    primaryLightY: number,
    primaryLightZ: number
  ) => {
    this.setState({ primaryLightX, primaryLightY, primaryLightZ });
  };

  handleCameraPosition = (
    cameraX: number,
    cameraY: number,
    cameraZ: number
  ) => {
    this.setState({ cameraX, cameraY, cameraZ });
  };

  startAnimation = () => {
    let delta = this.clock.getDelta();
    const dTheta = delta * Math.PI; // 每秒转动角度 θ 为 PI， 即两秒转一周
    this.theta = this.theta >= Math.PI * 2 ? 0 : this.theta + dTheta;
    this.animate = this.theta >= Math.PI * 2 ? null : this.animate;
    const x = Math.sin(this.theta);
    const z = Math.cos(this.theta);
    this.setState({
      primaryLightX: x,
      primaryLightZ: z
    });
    this.animate && this.animate(this.startAnimation);
  };

  cameraAnimation = () => {
    this.moon && this.moon.cleanBackground();
    this.setState({
      cameraY: 66,
      cameraZ: 360,
      primaryLightX: 0,
      primaryLightZ: 1,
      done: true
    });
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
