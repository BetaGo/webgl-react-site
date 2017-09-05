// @flow

import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { TransitionMotion, spring } from 'react-motion';

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

      willEnter() {
        return { x: -100, opacity: 0 };
      }
      render() {
        return (
          <TransitionMotion
            defaultStyles={[{ key: 'a', style: { x: -100, opacity: 0 } }]}
            styles={[
              {
                key: 'a',
                style: {
                  x: spring(0, { stiffness: 60, damping: 26 }),
                  opacity: spring(1, { stiffness: 60, damping: 36 })
                }
              }
            ]}
            willEnter={this.willEnter}
          >
            {styles =>
              <BaseComponent
                style={{
                  transform: `translate3d(${styles[0].style.x}px, 0, 0)`,
                  opacity: styles[0].style.opacity
                }}
                {...this.props}
              />}
          </TransitionMotion>
        );
      }
    }
    return Transition;
  }
  return enhance;
}
