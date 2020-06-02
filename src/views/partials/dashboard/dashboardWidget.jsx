import React from "react";
import RssFeedForm from "./containers/rssFeedForm.js";
import RssFeedResult from "./containers/rssFeedResult.js";
import "./dashboardWidget.scss";


const DashboardWidgets = () => {
  return (
  <div className="dashboardWidgets h-100 flex flex-align-center flex-dir-col flex-justify-start">
  <div className="flex dashboardWidgets-title">Welcome, Please check if you want to fill the form </div>
   <RssFeedForm />
   <RssFeedResult />
  </div>
)};

export default DashboardWidgets;
