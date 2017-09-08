// @flow
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
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
  value: number,
  pointer: boolean
};

/**
 * 
 * @param {number} theta 
 * @param {object} param1 
 */
const ellipsePath = (
  theta: number,
  { cx, cy, rx, ry }: { cx: number, cy: number, rx: number, ry: number }
) => {
  // 世界坐标系为 x轴向下
  // 椭圆坐标系为 x轴向上
  // θ(theta): 以椭圆圆心为坐标轴原点, 椭圆上的任意一点到圆心的直线 与 坐标轴x轴 的夹角.
  let x = cx + rx * Math.cos(theta);
  let y = cy - ry * Math.sin(theta);
  return { x, y };
};

/**
 * 获取鼠标在某 `div` 元素内的位置. 坐标原点为 `div` 元素的左上角
 * @param {HTMLDivElement} element 
 * @param {MouseEvent} event 
 * @return {Object} return鼠标在该元素内的位置
 */
const getMousePosition = (e: SyntheticMouseEvent<HTMLDivElement>) => {
  const box = e.currentTarget.getBoundingClientRect();
  const elementX = box.left + window.pageXOffset;
  const elementY = box.top + window.pageYOffset;
  return {
    x: e.clientX - elementX,
    y: e.clientY - elementY
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
  const ex = x - cx;
  const ey = cy - y;
  return Math.atan2(ey, ex);
};

const getVectorLength = (x: number, y: number) => {
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
  },
  hover: {
    cursor: 'pointer'
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
    value: 90,
    pointer: false
  };

  cx: number;
  cy: number;
  rx: number;
  ry: number;
  element: ?HTMLDivElement;

  componentWillMount() {
    const { width, height, strokeWidth } = this.props;
    this.cx = width / 2;
    this.cy = height / 2;
    this.rx = width / 2 - strokeWidth;
    this.ry = height / 2 - strokeWidth;
  }

  handleMouseMove = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    const { rx, ry, cx, cy } = this;
    const mousePosition = getMousePosition(e);
    // console.log(`mousePosition: ${JSON.stringify(mousePosition)}`);
    const theta = getTheta(mousePosition.x, mousePosition.y, cx, cy);
    // console.log(`theta: ${theta}`)
    const ellipsePosition = ellipsePath(theta, { rx, ry, cx, cy });
    // console.log(`ellipsePosition: ${JSON.stringify(ellipsePosition)}`);
    const lenMouse = getVectorLength(
      mousePosition.x - cx,
      cy - mousePosition.y
    );
    const lenEllipse = getVectorLength(
      ellipsePosition.x - cx,
      cy - ellipsePosition.y
    );
    const deltaLen = Math.abs(lenMouse - lenEllipse);
    if (deltaLen < 18) {
      this.setState({ pointer: true });
    } else {
      this.setState({ pointer: false });
    }
    // console.log(deltaLen);
  };

  getButtonPosition = () => {
    const { value } = this.state;
    const { cx, cy, rx, ry } = this;
    const theta = value * Math.PI * 2 / 360;
    const position = ellipsePath(theta, { cx, cy, rx, ry });
    return position;
  };

  /*
  createAnnulusClickArea = (e: MouseEvent) => {
    const { rx, ry, cx, cy } = this;
    const mousePosition = getMousePosition(this.element, e);
    const theta = getTheta(mousePosition.x, mousePosition.y) || 0;
    const ellipsePosition = ellipsePath(theta, { rx, ry, cx, cy });
    const lenMouse = getVectorLength(mousePosition.x, mousePosition.y);
    const lenEllipse = getVectorLength(ellipsePosition.x, ellipsePosition.y);
    const deltaLen = Math.abs(lenMouse - lenEllipse);
    if (deltaLen < 10) {
      this.setState({ pointer: true });
    } else {
      this.setState({ pointer: false });
    }
    console.log(deltaLen);
  };
  */

  render() {
    const { classes } = this.props;
    const { width, height, stroke, strokeWidth } = this.props;
    const { rx, ry, cx, cy } = this;
    const position = this.getButtonPosition();
    const allClassName = classNames({
      [classes.root]: true,
      [classes.hover]: this.state.pointer
    });
    return (
      <div
        className={allClassName}
        ref={e => (this.element = e)}
        onMouseMove={this.handleMouseMove}
      >
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
