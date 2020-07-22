import React, {Fragment} from 'react';
import Jumbotron from "./partials/Jumbotron";
import Categories from "./partials/Categories";


export default function Home() {
  return (
    <Fragment>
      <Jumbotron/>
      <Categories/>
    </Fragment>
  );
}
