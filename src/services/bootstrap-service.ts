import ReactGA from 'react-ga';

export const InitializeApp = (): void => {
  // Make only base route accessable
  if (window.location.pathname !== '/') {
    window.location.assign('/');
  }

  // Enable Google Analytics
  if (window.location.host.indexOf('cabbysgrillandpatio') === 0) {
    ReactGA.initialize('UA-125471451-2');
    ReactGA.pageview(window.location.pathname);
  }
};
