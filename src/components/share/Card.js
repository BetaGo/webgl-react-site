// @flow

import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderLeft: `1px solid rgba(255, 255, 255, 0.12)`,
    transition: '0.3s',
    padding: 0,
    '&:hover': {
      boxShadow: 'rgba(0,0,0,0.7) 15px 0 15px -5px',
      zIndex: '1'
    }
  }
};

function Card(props) {
  const { classes, className: classNameProp, ...other } = props;
  const rootClassName = classNames(classes.root, classNameProp);
  return (
    <div className={rootClassName} {...other}>
      {props.children}
    </div>
  );
}

export default injectSheet(styles)(Card);
