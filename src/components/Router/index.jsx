import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home} from "../list/Home";
import {Contacts} from "../list/Contacts";
import {About} from "../list/About";

export function RouterMain() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/home' component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/contacts' component={Contacts}/>
    </Switch>
  );
}
