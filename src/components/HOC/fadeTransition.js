// @flow

import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';

type Options = {
  stiffness?: number,
  damping?: number,
  precision?: number
};

export default function fadeTransition(
  options?: Options = { ...presets.gentle, precision: 0.01 }
) {
  const { stiffness, damping, precision } = options;

  function enhance(BaseComponent: ComponentType<any>) {
    class Transition extends Component<any> {
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
                  x: spring(0, { stiffness, damping, precision }),
                  opacity: spring(1, { stiffness, damping, precision })
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
