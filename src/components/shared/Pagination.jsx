import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {Redirect} from "react-router-dom";


class OffersPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '1',
      nexPage: '1'
    };
  }

  handleChange = (event, value) => {
    this.setState({
      nexPage: value.toString(),
    })
  };

  render() {

    if(this.state.currentPage !== this.state.nexPage){
      return <Redirect to={`/offers/all/${this.state.nexPage}/4/createdAt/-1`} />
    }

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
