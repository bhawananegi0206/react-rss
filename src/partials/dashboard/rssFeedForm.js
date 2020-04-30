import React from "react";
import TextInput from "../../components/input/textInput";
import SubmitButton from "../../components/button/submitButton";
import SimpleList from "../../components/list/SimpleList";
import ErrorMessages from "../../components/errors/errorMessages";
import RssFeedService from "../../services/rssFeedService";
import memoizeOne from "memoize-one";
import * as rssParser from "react-native-rss-parser";
import "./rssFeedForm.scss";

const downloadableLinks = memoizeOne((items) =>
  items.reduce((acc, item) => {
    if (item.links[0].url.indexOf("http") === 0) {
      acc.push(item);
    }
    return acc;
  }, [])
);

class rssFeedForm extends React.Component {
  constructor() {
    super();
    this.state = {
      rssFeedUrl: "",
      submitButtonDisabled: true,
      itemsList: [],
      title: "",
      description: "",
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

  fetchData(url) {
    RssFeedService.fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.response.statusText);
        }
        return response.data;
      })
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        this.setState({
          itemsList: downloadableLinks(rss.items),
          title: rss.title,
          description: rss.description,
          invalidText: false,
          errors: "",
        });
      })
      .catch((error) =>
        this.setState({
          errors: error.response.statusText,
          invalidText: false,
          itemsList: [],
        })
      );
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
