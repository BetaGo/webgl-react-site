import React, { Component } from 'react';
import { ThemeProvider } from 'react-jss';
import Home from './components/Home';
import theme from './components/styles/theme';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
