import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter basename='/admin'>
         <App />
    </BrowserRouter>
, document.getElementById('root'));
