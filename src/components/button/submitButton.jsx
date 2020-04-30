import React from "react";
import PropTypes from "prop-types";
import "./submitButton.scss";

class SubmitButton extends React.PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props);
  }

  render() {
    const { className, disabled, children } = this.props;

    return (
      <button
        type="button"
        onClick={this.handleClick}
        disabled={disabled}
        className={`button ${className}`}
      >
        {children}
      </button>
    );
  }
}

SubmitButton.defaultProps = {
  className: "transparent",
  disabled: false,
  onClick: undefined,
};

SubmitButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default SubmitButton;
