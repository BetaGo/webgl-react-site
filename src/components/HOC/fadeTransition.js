// @flow

import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { Motion, spring } from 'react-motion';

type Options = {
  stiffness?: number,
  damping?: number,
  precision?: number
};

type Props = {};
type State = {
  open: boolean
};

export default function fadeTransition(options?: Options = {}) {
  const { stiffness, damping, precision } = options;

  function enhance(BaseComponent: ComponentType<any>) {
    class Transition extends Component<Props, State> {
      state = { open: false };
      render() {
        return (
          <Motion style={{ x: spring(this.state.open ? 400 : 0) }}>
            {({ x }) =>
              <BaseComponent
                style={{ transform: `translate3d(${x}px, 0, 0)` }}
              />}
          </Motion>
        );
      }
    }
    return Transition;
  }
  return enhance;
}
