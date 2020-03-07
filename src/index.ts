import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { InitializeApp } from './services/bootstrap-service';

InitializeApp();
ReactDOM.render(React.createElement(App), document.getElementById('root') as HTMLElement);
