import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { OfferContext } from '../../../../context/offer-context';
import { useHistory } from 'react-router-dom';
import Loading from "../../../shared/Loading";

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

  const handleFilter = (categoryId) => {
    updateOfferContext('filter', categoryId);

    history.push(`/offers/all/1/${offersPerPage}/createdAt/-1/${filter}`);
  };

  return (
    <div className="categories-container">
      { 
        categories.length > 0
          ? categories.map((category, index) => (
              <div className="category-point" key={index}>
                <Button className="category" onClick={() => handleFilter(category._id)}>
                  <img
                    src={ categoryIcons[sanitizedText(category.name)] 
                      ? require(`../../../../assets/svg/categories/${categoryIcons[sanitizedText(category.name)]}`)
                      : require('../../../../assets/svg/categories/categories.svg')
                    }
                    // src={require(`../../../../assets/svg/categories/${categoryIcons[sanitizedText(category.name)]}`)}
                    alt={categoryIcons[sanitizedText(category.name)]}
                  />
                </Button>
                <p>{sanitizedText(category.name)}</p>
              </div>
            ))
          : <div className="component-loader">
              <Loading/>
            </div>
      }
    </div>
  );
}
