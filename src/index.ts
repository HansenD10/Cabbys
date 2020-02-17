import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';

ReactGA.initialize("UA-125471451-2");
ReactGA.pageview(window.location.pathname)

ReactDOM.render(React.createElement(App), document.getElementById('root') as HTMLElement);
