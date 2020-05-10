import RssFeedService from "../../services/rssFeedService";


export const SET_IS_PAGINTAIONDISABLED = 'dashboard/SET_IS_PAGINTAIONDISABLED';
export const SET_FEED_DATA = 'dashboard/SET_FEED_DATA';

export const setFeedData = data => ({
  type: SET_FEED_DATA,
  data
});

export const setIsPaginationDisabled = isPaginationDisabled => ({
  type: SET_IS_PAGINTAIONDISABLED,
  isPaginationDisabled
});

export const getRssFeedData = (url) => {
  return (dispatch) => {
    RssFeedService.fetch(url).then((data) => {
      dispatch(setFeedData(data));
    });
  };
};