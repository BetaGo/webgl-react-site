import React, { Component } from 'react';
import injectSheet from 'react-jss';
import MainHeader from './MainHeader';
import Nav from './Nav';
import SubHeader from './SubHeader';

const styles = theme => ({
  root: {
    background: theme.background.default,
  },
});

function Home(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MainHeader />
      <Nav />
      <SubHeader />
    </div>
  );
}

export default injectSheet(styles)(Home);
