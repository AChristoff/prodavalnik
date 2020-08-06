import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import Loading from "../components/shared/Loading";
import ViewOffer from "../components/pages/offers/crud/ViewOffer";
import EditOffer from "../components/pages/offers/crud/EditOffer";
import Logout from "../components/pages/user/Logout";
import PrivateRoute from "./PrivateRoute";
import CreateOffer from "../components/pages/offers/crud/CreateOffer";
import DeleteOffer from "../components/pages/offers/crud/DeleteOffer";

const Home = lazy(() => import('../components/pages/home/Home'));
const AllOffers = lazy(() => import('../components/pages/offers/AllOffers'));
const UserOffers = lazy(() => import('../components/pages/offers/UserOffers'));
const Login = lazy(() => import('../components/pages/user/Login'));
const UserProfile = lazy(() => import('../components/pages/user/Profile'));
const Register = lazy(() => import('../components/pages/user/Register'));
const RegisterConfirm = lazy(() => import('../components/pages/user/RegisterConfirm'));
const NotFound = lazy(() => import('../components/pages/errors/NotFound'));

export function RouterMain() {
  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/#' exact component={Home}/>
        <Route path='/home' exact component={Home}/>
        <Route path='/offers/view/:id' exact component={ViewOffer}/>
        <Route path='/user/login' exact component={Login}/>
        <Route path='/user/register' exact component={Register}/>
        <Route path='/user/register/confirm/:token' exact component={RegisterConfirm}/>
        <Route path='/offers/all/:page?/:limit?/:sort?/:order?/:search?/:filter?' exact component={AllOffers}/>
        <PrivateRoute path="/user/offers" exact component={UserOffers}/>
        <PrivateRoute path="/user/profile" exact component={UserProfile}/>
        <PrivateRoute path='/offers/create' exact component={CreateOffer}/>
        <PrivateRoute path='/offers/edit/:id' exact component={EditOffer}/>
        <PrivateRoute path='/offers/delete/:id' exact component={DeleteOffer}/>
        <PrivateRoute path="/user/logout" exact component={Logout}/>
        <Route component={NotFound}/>
      </Switch>
    </Suspense>
  );
}
