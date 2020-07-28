import React from 'react';

import Button from "@material-ui/core/Button";
import {OfferContext} from "../../../../context/offer-context";
import {Redirect} from "react-router-dom";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      filter: '',
      redirect: false,
    };
  }

  static contextType = OfferContext;

  handleFilter = (category) => {

    this.setState({
      filter: category,
      redirect: true,
    });

    this.context.updateOfferContext('filter', category);
    console.log('filter after category click', category);
  };

  render() {
    const {categories} = this.props;
    let {redirect, filter} = this.state;
    const {offersPerPage} = this.context;
    filter = filter.replace(/\s/g, '+');

    if (redirect) {
      return <Redirect to={`/offers/all/1/${offersPerPage}/createdAt/-1/${filter}`} />
    }

    return (
      <div className="categories-container">

        {Object.keys(categories).map((category, index) =>
          <div className="category-point" key={index}>
            <Button className="category" onClick={() => this.handleFilter(category)}>
              <img src={require(`../../../../assets/svg/categories/${categories[category]}`)} alt={category}/>
            </Button>
            <p>{category}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Category;
