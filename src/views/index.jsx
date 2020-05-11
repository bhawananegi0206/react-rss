import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import "../styles/common";  

import store from '../store/store';
import App from "./app.jsx";


ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root')
);
