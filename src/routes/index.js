import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import NotFound from '../components/NotFound'
import Login from '../components/Login'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/artists/:artistName/gallery' component={Gallery}/>
      <Route path='/artists/:artistName/contact' component={Contact}/>
      <Route path='/login' component={Login}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);
