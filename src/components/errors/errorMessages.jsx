import React from "react";
import PropTypes from "prop-types";
import "./errorMessages.scss";

const ErrorMessages = ({ messages }) => (
  <div className="errors center">{messages}</div>
);

ErrorMessages.propTypes = {
  messages: PropTypes.string.isRequired,
};

export default ErrorMessages;
