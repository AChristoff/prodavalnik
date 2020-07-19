import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';

import NotFound from "../components/404/NotFound";
import Home from "../components/pages/home/Home";

export function RouterMain() {
  return (
    <Suspense fallback={() => <p>Loading...</p>}>
      <Switch>
        <Route path='/' exact component={Home}/>

        <Route path='/user/login' exact component={lazy(() => import('../components/pages/user/Login'))}/>
        <Route path='/user/register' exact component={lazy(() => import('../components/pages/user/Register'))}/>
        <Route path='/user/register/confirm' exact component={lazy(() => import('../components/pages/user/RegisterConfirm'))}/>

        <Route component={NotFound}/>
      </Switch>
    </Suspense>
  );
}
