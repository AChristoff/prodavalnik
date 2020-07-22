import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';

const Home = lazy(() => import('../components/pages/home/Home'));
const Login = lazy(() => import('../components/pages/user/Login'));
const Register = lazy(() => import('../components/pages/user/Register'));
const RegisterConfirm = lazy(() => import('../components/pages/user/RegisterConfirm'));
const NotFound = lazy(() => import('../components/pages/NotFound'));

export function RouterMain() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/user/login' exact component={Login}/>
        <Route path='/user/register' exact component={Register}/>
        <Route path='/user/register/confirm' exact component={RegisterConfirm}/>
        <Route component={NotFound}/>
      </Switch>
    </Suspense>
  );
}
