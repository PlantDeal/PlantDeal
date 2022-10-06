/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import {Provider} from 'react-redux';

ReactDOM.createRoot(doucument.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

AppRegistry.registerComponent(appName, () => App);

reportWebVitals();
