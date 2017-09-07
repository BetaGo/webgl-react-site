import React, { Component } from 'react';

type Props = {
  width: number,
  height: number
};

type ShapeOption = {
  startX: number,
  StartY: number,
  rx: number,
  ry: number,
  xAxisRotation: number,
  largeArcFlag: number,
  sweepFlag: number,
  endX: number,
  endY: number
};

const defaultShapeOption = {
  startX: 0,
  startY: 0,
  rx: 100,
  ry: 50,
  xAxisRotation: 0,
  largeArcFlag: 0,
  sweepFlag: 0,
  endX: 200,
  endY: 0
};

const getShape = (
  {
    startX,
    startY,
    rx,
    ry,
    xAxisRotation,
    largeArcFlag,
    sweepFlag,
    endX,
    endY
  }: ShapeOption = defaultShapeOption
) => {
  return `M${startX} ${startY} A${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
};

class Slider extends Component<Props> {
  render() {
    const { width, height } = this.props;
    return (
      <svg style={{ width, height }}>
        <path d={getShape()} />
      </svg>
    );
  }
}

export default Slider;
