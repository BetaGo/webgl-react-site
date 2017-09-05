import React, { Component } from 'react';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import store from './redux/configStore';
import Home from './views/Home';
import theme from './components/styles/theme';

function App(props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
