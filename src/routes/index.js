import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import NotFound from '../components/NotFound'
import Login from '../components/Login'
import SignOut from '../components/SignOut'
import AdminPanel from '../components/AdminPanel'
import GalleryItemPage from '../components/GalleryItemPage'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/artists/:artistName/gallery' component={Gallery} />
      <Route exact path='/artists/:artistName/gallery/:timestamp' component={GalleryItemPage} />
      <Route path='/artists/:artistName/contact' component={Contact} />
      <Route path='/login' component={Login} />
      <Route path='/signout' component={SignOut} />
      <Route path='/admin' component={AdminPanel} />
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);
