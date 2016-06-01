import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { hashHistory } from 'react-router'

import SuhDude from './components/app';

import dudes from './data/dudes';
import suhs from './data/audio';

// Routes
// var routes = (
//   <Router history={hashHistory}>
//     <Route path="/" component={SuhDude}/>
//   </Router>
// )

// ReactDOM.render(
//  routes,
//   document.querySelector('#cool')
// );


ReactDOM.render(
  <SuhDude />,
  document.querySelector('#cool')
);