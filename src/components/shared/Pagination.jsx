import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


class OffersPagination extends React.Component {

  handleChange = (event, value) => {
    console.log(value);
  };


  render() {
    return (
      <div>
        <Pagination
          count={10}
          color="primary"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default OffersPagination;
