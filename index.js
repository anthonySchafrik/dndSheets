/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import App from './app/App';
import { name as appName } from './app.json';
import store from './app/redux/store';

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
