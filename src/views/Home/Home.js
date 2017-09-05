// @flow

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainHeader from '../../components/Home/MainHeader';
import Nav from '../../components/Home/Nav';
import SubHeader from '../../components/Home/SubHeader';
import Moon from '../../components/three/Moon/Moon';

// actions
import { endCameraAnimate } from './HomeRedux';

const styles = theme => ({
  root: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    background: theme.background.default
  }
});

export type DefaultProps = {
  classes: Object,
  endCameraAnimate: Function,
  isCameraAnimateEnd: boolean
};

type AllProps = DefaultProps;

function Home(props: AllProps) {
  const { classes, endCameraAnimate, isCameraAnimateEnd } = props;

  return (
    <div className={classes.root}>
      {isCameraAnimateEnd && <MainHeader />}
      {isCameraAnimateEnd && <Nav />}
      {isCameraAnimateEnd && <SubHeader />}
      <Moon endCameraAnimate={endCameraAnimate} />
    </div>
  );
}

Home.DefaultProps = {
  isCameraAnimateEnd: false
};

const styledHome = injectSheet(styles)(Home);

const mapStateToProps = (state: Object) => ({
  isCameraAnimateEnd: state.home.isCameraAnimateEnd
});

const mapActionsToProps = (dispatch: Function) => ({
  endCameraAnimate: bindActionCreators(endCameraAnimate, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(styledHome);
