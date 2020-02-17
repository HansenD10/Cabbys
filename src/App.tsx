import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import HomePage from "./components/homepage"
import Hours from "./components/hours"
import Menu from "./components/menu"
import Events from "./components/events"
import Gallery from "./components/gallery"
import AboutComponent from "./components/about"

import './styles/_typography.scss';
import './styles/_base.scss';
import { BasePage } from './models/KenticoModels';
import KenticoService from './services/kentico-service';

interface AppState {
  basePage: BasePage,
  error: boolean
}

class App extends React.Component<{}, AppState> {
  private kenticoService: KenticoService = new KenticoService();

  constructor(props: {}) {
    super(props);
    this.kenticoService.GetData()
      .then(basePage => this.setState({ basePage }))
      .catch(err => {
        this.setState({ error: true })
      });
  }

  public render(): React.ReactNode {
    if (this.state != null && this.state.basePage) {
      const { navigation, homePage, hours, menu, eventList, about, gallery } = this.state.basePage;

      return (
        <React.Fragment>
          <script src="https://kit.fontawesome.com/6128e76e98.js"></script>
          {navigation && homePage && <Header nav={navigation} logo={homePage.logo} />}
          {homePage && <HomePage backgroundImage={homePage.backgroundImage} />}
          {hours && <Hours hours={hours.hours} />}
          {menu && <Menu menu={menu.categories} />}
          {eventList && about && <Events events={eventList} links={about.socialMediaLinks} />}
          {gallery && <Gallery gallery={gallery} />}
          {about && <AboutComponent about={about} />}
        </React.Fragment>
      )
    } else if (this.state != null && this.state.error) {
      return (
        <React.Fragment>
          <script src="https://kit.fontawesome.com/6128e76e98.js"></script>
          <div className="error-wrapper">
            <h2>500</h2>
            <p>Whoops, something broke. Check back soon!</p>
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <script src="https://kit.fontawesome.com/6128e76e98.js"></script>
          <div className="loading-wrapper"></div>
        </React.Fragment>
      )
    }
  }
}

export default App;