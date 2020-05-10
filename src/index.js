import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "./styles/common";

import store from './store/store';
import App from "./app.js";



ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);