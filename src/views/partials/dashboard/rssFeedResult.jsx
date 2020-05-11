import React from "react";
import PropTypes from 'prop-types';
import SimpleList from "../../../components/list/SimpleList";
import memoizeOne from "memoize-one";

import "./rssFeedResult.scss";

const downloadableLinks = memoizeOne((items = []) =>
  items.filter((item) => item.links[0].url.indexOf("http") === 0 ));

class rssFeedResult extends React.Component {
  constructor() {
    super();
    this.handleDisabledState = this.handleDisabledState.bind(this);
  }

  handleDisabledState() {
    const { isPagination } = this.props;
    this.props.onClick(!isPagination);
  }
  
  render() { 
    const { feedData, isPagination} = this.props;
    const {items,title,description} = feedData;
    const itemsList = downloadableLinks(items);
    return (
      <>
          {/* {errors && <ErrorMessages messages={errors} />} */}
           {itemsList.length > 0 && (<div className="rssFeedResult">
            <div className="rssFeedResult-listTitle center">{title}</div>
            <div className="rssFeedResult-listDesc center">{description}</div>
            <div className="flex flex-align-center">
            <input type="checkbox" className="rssFeedResult-checkBox" checked={isPagination} onChange={this.handleDisabledState}/>
            <span className="rssFeedResult-disclaimer">Please select if you want to see all items</span></div>
            <SimpleList items={itemsList} showAllItems={isPagination} />
          </div>)}
          </>
    );
  }
}


rssFeedResult.propTypes = {
  isPagination: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  feedData:PropTypes.object.isRequired
}
export default rssFeedResult;
