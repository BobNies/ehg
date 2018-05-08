import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Gallery from '../components/Gallery';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/artists/:artistName' component={Gallery}/>
    </Switch>
  </BrowserRouter>
);
