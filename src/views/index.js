import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from '../store/store';
import Dashboard from "./partials/dashboard/dashboardWidget.jsx";

import "../styles/common.scss"; 


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    )
  }
}

if (!document.getElementById("app").childNodes.length) {
  ReactDOM.render(<App />, document.getElementById("app"))
} else {
  ReactDOM.hydrate(<App />, document.getElementById("app"))
}