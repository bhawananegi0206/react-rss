import { get, assign } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import XMLParser from "react-xml-parser";
import TextInput from "../../components/input/textInput";
import SubmitButton from "../../components/button/submitButton";
import SimpleList from "../../components/list/SimpleList";
import ErrorMessages from "../../components/errors/errorMessages";
import * as rssParser from "react-native-rss-parser";
import "./rssFeedForm.scss";

class rssFeedForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      rssFeedUrl: "",
      submitButtonDisabled: true,
      itemsList: [],
      title: "",
      description: "",
      errors: "",
      invalidText: false,
      requiredError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, props) {
    this.setState({
      rssFeedUrl: e,
      submitButtonDisabled: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleSave(this.state);
  }

  fetchData(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      })
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        const downloadableLinks = rss.items.reduce((acc, item) => {
          if (item.links[0].url.indexOf("http") === 0) {
            acc.push(item);
          }
          return acc;
        }, []);
        this.setState({
          itemsList: downloadableLinks,
          title: rss.title,
          description: rss.description,
          invalidText: false,
        });
      })
      .catch((error) =>
        this.setState({ errors: error.message, invalidText: false })
      );
  }

  handleSave() {
    const url_pattern = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    const { rssFeedUrl } = this.state;

    if (!rssFeedUrl.match(url_pattern)) {
      this.setState({
        invalidText: true,
      });
    } else {
      this.fetchData(rssFeedUrl);
    }
  }

  render() {
    const {
      rssFeedUrl,
      submitButtonDisabled,
      itemsList,
      errors,
      title,
      description,
      invalidText,
      requiredError,
    } = this.state;

    return (
      <>
        <div className="form--body rssFeed">
          <form className="rssFeed  h-100" onSubmit={this.handleSubmit}>
            <div className="flex flex-dir-col h-100">
              <div className="flex-1 flex flex-dir-col flex-align-center">
                <h2 className="rssFeed-formtitle center uppercase">
                  Please enter your RSS feed Url
                </h2>
                <div className="form-group">
                  <TextInput
                    name="name"
                    value={rssFeedUrl}
                    placeholder="Step name"
                    onChange={this.handleChange}
                    className="large"
                    errorMessage="Please enter correct RSS feed URL"
                    invalidText={invalidText}
                  />
                </div>
                <SubmitButton
                  onClick={this.handleSave}
                  disabled={submitButtonDisabled}
                  className="button--large"
                >
                  <i className="avb avb-link" />
                  Click here
                </SubmitButton>
              </div>
            </div>
          </form>
          {errors && <ErrorMessages messages={errors} />}
          {itemsList.length > 0 && [
            <div className="rssFeed-listTitle center">{title}</div>,
            <div className="rssFeed-listDesc center">{description}</div>,
            <SimpleList items={itemsList} />,
          ]}
        </div>
      </>
    );
  }
}


export default rssFeedForm;
