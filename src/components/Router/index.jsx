import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "../list/Home";
// import {Contacts} from "../list/Contacts";
// import {About} from "../list/About";

export function RouterMain() {
  return (
    <Suspense fallback={() => <p>Loading...</p>}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/home' component={Home}/>
        <Route path='/about' component={lazy(() => import('../list/About'))}/>
        <Route path='/contacts' component={lazy(() => import('../list/Contacts'))}/>
      </Switch>
    </Suspense>
  );
}
