import axios from "axios";
import * as rssParser from "react-native-rss-parser";

const RssFeedService = {
  fetch(url) {
    return axios.get(url).then((rsp) => rssParser.parse(rsp.data));
  }
};

export default RssFeedService;
