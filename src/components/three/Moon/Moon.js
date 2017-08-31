import React, { Component } from 'react';
import injectSheet from 'react-jss';
import ShowModel from '../ShowModel/ShowModel';

const styles = {
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    top: '0px'
    // pointerEvents: 'none',
  }
};

function Moon(props) {
  const { classes } = props;
  const modelConfig = {
    modelURL: '3DModels/Moon.json'
  };
  return <ShowModel className={classes.root} modelConfig={modelConfig} />;
}

export default injectSheet(styles)(Moon);
