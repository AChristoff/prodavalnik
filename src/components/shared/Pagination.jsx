import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {OfferContext} from "../../context/offer-context";

class OffersPagination extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = OfferContext;

  handleChange = (event, value) => {
    value = Number(value);
    this.props.update('currentPage', value)
  };

  render() {

    const {currentPage, pageCount} = this.props;

    return (
      <div>
        <Pagination
          page={currentPage}
          count={pageCount}
          color="primary"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default OffersPagination;
