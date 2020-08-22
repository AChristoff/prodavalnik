import React, {useEffect, useContext, useState} from 'react';
import Category from "./Category";
import CategoryService from "../../../../services/category-service";
import {AlertContext} from "../../../../context/alert-context";
import Heading from "../../../shared/Heading";

export default function Categories() {
  const categoryIcons = {
    Vehicles: 'car.svg',
    Properties: 'key.svg',
    'Electronics & Appliances': 'phone.svg',
    'Furniture & Decor': 'chair.svg',
    'Fashion & Beauty': 'bag.svg',
    Pets: 'pet.svg',
    'Sports & Equipment': 'ball.svg',
    'Machines & Tools': 'tools.svg',
    'Art & Books': 'guitar.svg',
    Antiques: 'antique.svg',
  };

  //State
  const [categories, setCategories] = useState([]);

  //Service
  const categoryService = new CategoryService();

  //Context
  const {updateAlertContext} = useContext(AlertContext);

   //Component did mount
   useEffect(() => {

    (async () => {

      try {
        const res = await categoryService.getCategories();
        setCategories(res.categories);
      } catch (error) {
        updateAlertContext('errorContext', error.message);
      }
    })();

  }, []);

  return (
    <div className="categories wrapper">
      <Heading text="Categories" />

      <Category categories={categories} categoryIcons={categoryIcons}/>
    </div>
  );
}
