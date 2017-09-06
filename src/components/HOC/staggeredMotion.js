// @flow

import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';

type Options = {
  stiffness?: number,
  damping?: number,
  precision?: number
};

type Props = {
  className?: string
};

type State = {
  x: number,
  opacity: number
};

function staggeredMotion(
  options?: Options = { ...presets.gentle, precision: 0.01 }
): (Array<ComponentType<any>>) => ComponentType<any> {
  function enhance(components: Array<ComponentType<any>>) {
    // const { stiffness, damping, precision } = options;
    class Stagger extends Component<Props, State> {
      state = {
        x: 0,
        opacity: 1
      };

      getStyles = prevStyles => {
        const endValue = prevStyles.map((_, i) => {
          return i === 0
            ? {
                x: spring(0, options),
                opacity: spring(1, options)
              }
            : {
                x: spring(prevStyles[i - 1].x, options),
                opacity: spring(prevStyles[i - 1].opacity, options)
              };
        });
        return endValue;
      };

      render() {
        const length = components.length;
        const defaultStyles = Array(length).fill({ x: -60, opacity: 0 });
        const { className: classNameProp } = this.props;
        return (
          <StaggeredMotion
            defaultStyles={defaultStyles}
            styles={this.getStyles}
          >
            {styles =>
              <div className={classNameProp}>
                {styles.map(({ x, opacity }, i) => {
                  let BaseComponent = components[i];
                  return (
                    <BaseComponent
                      key={i}
                      style={{
                        transform: `translate3d(${x}px, 0, 0)`,
                        opacity
                      }}
                    />
                  );
                })}
              </div>}
          </StaggeredMotion>
        );
      }
    }
    return Stagger;
    // class Animation extends BaseComponent<any> {

    //   __childrenQuantities = this.props.children.length;

    //   getStyles = prevStyles => {
    //     const endValue = prevStyles.map((_, i) => {
    //       return i === 0
    //         ? this.state
    //         : {
    //             x: spring(prevStyles[i - 1].x, presets.gentle),
    //             opacity: spring(prevStyles[i - 1].opacity, presets.gentle)
    //           };
    //     });
    //   };

    //   render() {
    //     const { __childrenQuantities: quantity } = this;
    //     return (
    //       <StaggeredMotion
    //         defaultStyles={
    //           Array(quantity).fill({
    //             x: -60, opacity: 0
    //           })
    //         }
    //         styles={this.getStyles}
    //       >
    //         {cards => <BaseComponent {...this.props} />}
    //       </StaggeredMotion>
    //     );
    //     // return <BaseComponent {...this.props} />;
    //   }
    // }
    // return Animation;
  }
  return enhance;
}

export default staggeredMotion;
