import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import Loading from "../components/shared/Loading";

const Home = lazy(() => import('../components/pages/home/Home'));
const AllOffers = lazy(() => import('../components/pages/offers/AllOffers'));
const UserOffers = lazy(() => import('../components/pages/offers/UserOffers'));
const Login = lazy(() => import('../components/pages/user/Login'));
const Register = lazy(() => import('../components/pages/user/Register'));
const RegisterConfirm = lazy(() => import('../components/pages/user/RegisterConfirm'));
const NotFound = lazy(() => import('../components/pages/errors/NotFound'));

export function RouterMain() {
  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/offers' exact component={AllOffers}/>
        <Route path='/user/offers' exact component={UserOffers}/>
        <Route path='/user/login' exact component={Login}/>
        <Route path='/user/register' exact component={Register}/>
        <Route path='/user/register/confirm' exact component={RegisterConfirm}/>
        <Route component={NotFound}/>
      </Switch>
    </Suspense>
  );
}
