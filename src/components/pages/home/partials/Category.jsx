import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { OfferContext } from '../../../../context/offer-context';
import { useHistory } from 'react-router-dom';


// Converts HTML Entities from DB text to display the corresponding symbols
const sanitizedText = (text) => {
  const textConverter = document.createElement('textarea');
  textConverter.innerHTML = text;

  return textConverter.value;
};

export default function Category({ error, filter, categories, categoryIcons }) {
  //Context
  const { offersPerPage, updateOfferContext } = useContext(OfferContext);
  //History
  const history = useHistory();

  const handleFilter = (category) => {
    updateOfferContext('filter', category);

    history.push(`/offers/all/1/${offersPerPage}/createdAt/-1/${filter}`);
  };

  console.log(categories);
  console.log(categoryIcons);
  
  return (
    <div className="categories-container">
      {categories.map((c, index) => (
        <div className="category-point" key={index}>
          <Button className="category" onClick={() => handleFilter(c._id)}>
            <img
              src={require(`../../../../assets/svg/categories/${categoryIcons[sanitizedText(c.category)]}`)}
              alt={categoryIcons[sanitizedText(c.category)]}
            />
          </Button>
          <p>{sanitizedText(c.category)}</p>
        </div>
      ))}
    </div>
  );
}
