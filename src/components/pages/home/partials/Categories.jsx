import React from 'react';
import Category from "./Category";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {}
    }
  }

  componentWillMount() {
    // TODO: getCategories from DB
    this.setState({
      categories: {
        'Vehicles': 'car.svg',
        'Properties': 'key.svg',
        'Electronics & Appliances': 'phone.svg',
        'Furniture & Decor': 'chair.svg',
        'Fashion & Beauty': 'bag.svg',
        'Pets': 'pet.svg',
        'Sports & Equipments': 'ball.svg',
        'Machines & Tools': 'tools.svg',
        'Art & Books': 'guitar.svg',
        'Antiques': 'antique.svg',
      }
    })
  }

  render() {
    return (
      <div className="categories wrapper">
        <h4>Categories</h4>
        <Category categories={this.state.categories}/>
      </div>
    );
  }
}

export default Categories;
