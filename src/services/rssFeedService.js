import axios from "axios";

const RssFeedService = {
  fetch(url) {
    return axios.get(url).then((rsp) => rsp);
  },
};

export default RssFeedService;
