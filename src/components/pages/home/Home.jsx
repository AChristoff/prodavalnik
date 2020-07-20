import React, {Fragment} from 'react';
import Jumbotron from "./subcomponents/Jumbotron";
import Categories from "./subcomponents/Categories";


export default function Home() {
  return (
    <Fragment>
      <Jumbotron/>
      <Categories/>
    </Fragment>
  );
}
