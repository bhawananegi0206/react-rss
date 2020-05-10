import { connect } from 'react-redux';
import rssFeedResult from '../rssFeedResult';
import * as selectors from '../../../store/dashboard/selectors';
import * as actions from '../../../store/dashboard/actions';

function mapStateToProps(state) {
  return {
    feedData: selectors.getFeedData(state),
    isPagination: selectors.isPaginationDisabled(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(isPagination) {
      dispatch(actions.setIsPaginationDisabled(isPagination));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(rssFeedResult);
