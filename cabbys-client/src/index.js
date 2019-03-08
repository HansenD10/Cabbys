import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route render={({ location }) => <App location={location} />} />
  </BrowserRouter>
  , document.getElementById('root'));