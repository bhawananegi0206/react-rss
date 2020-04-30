import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import "./textInput.scss";

const WAIT_INTERVAL = 500;

class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillMount() {
    this.timer = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        // eslint-disable-line react/no-did-update-set-state
        value: this.props.value,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange(e) {
    clearTimeout(this.timer);
    const { value } = e.target;
    this.setState({ value }, () => {
      this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    });
  }

  triggerChange() {
    const { value } = this.state;
    this.props.onChange(value, this.props);
  }

  render() {
    const { value } = this.state;
    const {
      name,
      className,
      placeholder,
      icon,
      maxLength,
      errorMessage,
      invalidText,
    } = this.props;

    return (
      <div className={`textInput center ${className}`}>
        <input
          type="url"
          placeholder={placeholder}
          className={`form-control border-input${icon ? " hasIcon" : ""}`}
          value={value}
          name={name}
          maxLength={maxLength}
          onChange={this.handleChange}
          required
        />
        {this.props.invalidText && (
          <div className="error-message">{errorMessage}</div>
        )}
      </div>
    );
  }
}

TextInput.defaultProps = {
  onChange: noop,
  className: "",
  placeholder: null,
  icon: null,
  maxLength: null,
  value: null,
  invalidText: false,
  errorMessage: "",
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  maxLength: PropTypes.number,
  invalidText: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default TextInput;
