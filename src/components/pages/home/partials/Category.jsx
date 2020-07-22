import React from 'react';

import Button from "@material-ui/core/Button";

export default function Category(props) {
  const name = 'aleksov-logo.svg';
  return (
    <div className="categories-container">

      {Object.keys(props.categories).map((category, index ) =>
        <div className="category-point" key={index}>
          <Button className="category">
            <img src={require(`../../../../assets/svg/categories/${props.categories[category]}`)} alt={category}/>
          </Button>
          <p>{category}</p>
        </div>
      )}
    </div>
  );
}
