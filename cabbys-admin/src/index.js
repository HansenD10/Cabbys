import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
         <Route render={({ location }) => <App location={location} />} />
    </BrowserRouter>
, document.getElementById('root'));
