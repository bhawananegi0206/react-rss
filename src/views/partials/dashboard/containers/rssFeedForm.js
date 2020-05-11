import { connect } from 'react-redux';
import rssFeedForm from '../rssFeedForm';
import * as actions from '../../../../store/dashboard/actions';


function mapDispatchToProps(dispatch) {
  return {
    onClick(isDisabled) {
      dispatch(actions.setIsPaginationDisabled(isDisabled));
    },
    getData(url) {
      dispatch(actions.getRssFeedData(url));
    }
  };
}

export default connect(null, mapDispatchToProps)(rssFeedForm);
