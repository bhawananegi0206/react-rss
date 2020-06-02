import React from "react";
import PropTypes from 'prop-types';
import TextInput from "../../../components/input/textInput.jsx";
import SubmitButton from "../../../components/button/submitButton.jsx";
import ErrorMessages from "../../../components/errors/errorMessages.jsx";
import "./rssFeedForm.scss";


class rssFeedForm extends React.Component {
  constructor() {
    super();
    this.state = {
      rssFeedUrl: "",
      submitButtonDisabled: true,
      itemsList: [],
      errors: "",
      invalidText: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      rssFeedUrl: e,
      submitButtonDisabled: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleSave(this.state);
  }

  handleSave() {
    const url_pattern = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    const { rssFeedUrl } = this.state;
    if (!rssFeedUrl.match(url_pattern)) {
      this.setState({
        invalidText: true,
        errors: "",
      });
    } else {
      this.props.getData(rssFeedUrl);
    }
  }

  render() {
    const {
      rssFeedUrl,
      submitButtonDisabled,
      errors,
      invalidText
    } = this.state;


    return (
      <>
        <div className="form--body rssFeed">
          <form className="h-100" onSubmit={this.handleSubmit}>
            <div className="flex flex-dir-col h-100">
              <div className="flex-1 flex flex-dir-col flex-align-center">
                <h2 className="rssFeed-formtitle center uppercase">
                  Please enter your RSS feed Url
                </h2>
                <div className="form-group">
                  <TextInput
                    name="name"
                    value={rssFeedUrl}
                    placeholder="Enter RSS URL to display"
                    onChange={this.handleChange}
                    className="large"
                    errorMessage="Please enter correct RSS feed URL"
                    invalidText={invalidText}
                  />
                </div>
                <SubmitButton
                  onClick={this.handleSave}
                  disabled={submitButtonDisabled}
                  className="btn-primary btn"
                >
                  <i className="avb avb-link" />
                  Click here
                </SubmitButton>
              </div>
            </div>
          </form>
          {errors && <ErrorMessages messages={errors} />}
        </div>
      </>
    );
  }
}


rssFeedForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired
}
export default rssFeedForm;
