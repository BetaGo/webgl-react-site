import React, { Component } from 'react';
import createModel from './ShowModelThree';

class ShowModel extends Component {
  componentDidMount() {
    const { modelConfig } = this.props;
    const model = createModel({ ...modelConfig, element: this.element });
    model.init();
    model.animate();
  }
  render() {
    let { className, style } = this.props;
    if (!className && !style) {
      style = {
        width: 600,
        height: 400
      };
    }

    return (
      <div className={className} style={style} ref={e => (this.element = e)} />
    );
  }
}

export default ShowModel;
