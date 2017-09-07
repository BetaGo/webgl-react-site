// @flow

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Sunny from 'react-icons/lib/md/wb-sunny';

type Props = {
  classes: Object,
  width: number,
  height: number
};

type EllipseOption = {
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  stroke: string,
  strokeWidth: number
};

type AllProps = EllipseOption & Props;

type State = {
  value: number
};

const ellipsePath = (
  theta: number,
  { cx, cy, rx, ry }: { cx: number, cy: number, rx: number, ry: number }
) => {
  // θ(theta): 以椭圆圆心为坐标轴原点, 椭圆上的任意一点到圆心的直线 与 坐标轴x轴 的夹角.
  let x = cx + rx * Math.cos(theta);
  let y = cy + ry * Math.sin(theta);
  return { x, y };
};

/**
 * 获取鼠标在某 `div` 元素内的位置. 坐标原点为 `div` 元素的左上角
 * @param {HTMLDivElement} element 
 * @param {MouseEvent} event 
 * @return {Object} return鼠标在该元素内的位置
 */
const getMousePosition = (element: HTMLDivElement, event: MouseEvent) => {
  const box = element.getBoundingClientRect();
  const elementX = box.left + window.pageXOffset;
  const elementY = box.top + window.pageYOffset;
  return {
    x: event.clientX - elementX,
    y: event.clientY - elementY
  };
};

/**
 * 获取点 `x` `y` 与坐标原点为 `cx` `cy` 的坐标系的夹角
 * @param {number} x 
 * @param {number} y 
 * @param {number} cx 
 * @param {number} cy 
 */
const getTheta = (x: number, y: number, cx: number, cy: number) => {
  const rx = x - cx;
  const ry = y - cy;
  return Math.atan2(rx, ry);
};

const getVectorlength = (x: number, y: number) => {
  return Math.pow(x * x + y * y, 0.5);
};

const styles = {
  root: {
    position: 'relative'
  },
  button: {
    position: 'absolute',
    fontSize: '36px',
    transform: 'translate(-50%, -50%)'
  }
};

class EllipseSlider extends Component<AllProps, State> {
  static defaultProps = {
    width: 300,
    height: 200,
    stroke: '#ccc',
    strokeWidth: 5
  };

  state = {
    value: 90
  };

  cx: number;
  cy: number;
  rx: number;
  ry: number;
  element: HTMLDivElement;

  componentWillMount() {
    const { width, height, strokeWidth } = this.props;
    this.cx = width / 2;
    this.cy = height / 2;
    this.rx = width / 2 - strokeWidth;
    this.ry = height / 2 - strokeWidth;
  }

  componentDidMount() {
    // this.element.addEventListener();
  }

  getButtonPosition = () => {
    const { value } = this.state;
    const { cx, cy, rx, ry } = this;
    const theta = value * Math.PI * 2 / 360;
    const position = ellipsePath(theta, { cx, cy, rx, ry });
    return position;
  };

  render() {
    const { classes } = this.props;
    const { width, height, stroke, strokeWidth } = this.props;
    const { rx, ry, cx, cy } = this;
    const position = this.getButtonPosition();
    return (
      <div className={classes.root} ref={e => (this.element = e)}>
        <svg width={width} height={height}>
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="transparent"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
        <div
          className={classes.button}
          style={{ top: `${position.y}`, left: `${position.x}` }}
        >
          <Sunny />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(EllipseSlider);
