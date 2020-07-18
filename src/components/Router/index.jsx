import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home} from "../list/Home";
import {Contacts} from "../list/Contacts";
import {About} from "../list/About";

export function RouterMain() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/contacts' component={Contacts}/>
    </Switch>
  );
}
