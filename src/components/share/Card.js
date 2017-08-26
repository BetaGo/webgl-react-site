// @flow

import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  root: {
    backgroundColor: '#242424',
    borderLeft: '2px solid #000',
    borderRight: '2px solid #000',
    color: '#e5e5e5',
    padding: 0,
    '&hover': {
      boxShadow: 'outset0  3px 5px #000',
    },
  },
  children: {
    transition: '0.3s',
    textAlign: 'left',
    '&:hover': {
      transform: 'translateX(1em)',
      boxShadow: 'outset0  3px 5px #000',
    },
  },
};

function Card(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.children}>
        {props.children}
      </div>
    </div>
  );
}

export default injectSheet(styles)(Card);
