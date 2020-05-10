import React from "react";
import PropTypes from "prop-types";

import "./SimpleList.scss";

class SimpleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemList: props.items,
      currentPage: 1,
      itemsPerPage: 5,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    const { selectedItemList, currentPage, itemsPerPage } = this.state;
    const { items, showAllItems} = this.props;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const renderList = showAllItems && items || selectedItemList.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    const pagination = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pagination.push(i);
    }
    return (
      <div>
        <div className="simpleList">
          {renderList.map((it, index) => (
            <div key={it} className="simpleList selectList--item">
              <div className="flex flex-align-left flex-dir-col pos-rel">
                <a href={it.links[0].url} className="simpleList-title" target="_blank">
                  {it.title}
                </a>
                <div className="simpleList-description">{it.description}</div>
              </div>
            </div>
          ))}
        </div>
        {!showAllItems && <div className="simpleList-pagination flex flex-justify-center">
          {pagination.map((number) => (
            <li key={number} id={number} onClick={this.handleClick}>
              {number}
            </li>
          ))}
        </div>}
      </div>
    );
  }
}

SimpleList.defaultProps = {
  items: [],
};

SimpleList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired),
  showAllItems: PropTypes.bool.isRequired
};

export default SimpleList;
