import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

class OffersPagination extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event, value) => {
    this.props.changePage(4)
  };

  render() {

    const {currentPage, pageCount, changePage} = this.props;

    return (
      <div>
        <Pagination
          defaultPage={currentPage}
          count={pageCount}
          color="primary"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default OffersPagination;
