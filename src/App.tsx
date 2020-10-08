import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import HomePageComponent from './components/homepage';
import Menu from './components/menu';
import Events from './components/events';
import Gallery from './components/gallery';
import AboutComponent from './components/about';

import './styles/_typography.scss';
import './styles/_base.scss';
import { BasePage } from './models/kentico/base_page';
import KenticoService from './services/kentico-service';
import HoursComponent from './components/hours';
import { ItemResponses } from '@kentico/kontent-delivery';

interface AppState {
  isLoading: boolean;
  basePage: BasePage | undefined;
  error: boolean;
  showMessage: boolean;
}

class App extends React.Component<{}, AppState> {
  private kenticoService: KenticoService = new KenticoService();

  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      basePage: undefined,
      error: false,
      showMessage: true
    };

    this.kenticoService.GetData().subscribe(
      (basePage: ItemResponses.ViewContentItemResponse<BasePage>): void => {
        return this.setState({ isLoading: false, basePage: basePage.item });
      },
      (error: any): void => this.setState({ error })
    );
  }

  public render(): React.ReactNode {
    if (!this.state.isLoading && !this.state.error && this.state.basePage) {
      const {
        navigation,
        homePage,
        hours,
        menu,
        events,
        about,
        gallery
      } = this.state.basePage;
      const { showMessage } = this.state;
      return (
        <React.Fragment>
          <script src="https://kit.fontawesome.com/6128e76e98.js" />
          {
            <Header
              nav={navigation.value}
              logo={homePage.value[0].logo.value[0]}
            />
          }
          {
            <HomePageComponent
              backgroundImage={homePage.value[0].backgroundImage.value[0]}
            />
          }
          {<HoursComponent hours={hours.value} />}
          {
            <Menu
              menu={[
                ...menu.value[0].foods.value,
                ...menu.value[0].drinks.value
              ]}
            />
          }
          {
            <Events
              events={events.value[0]}
              links={about.value[0].socialMediaLinks.value}
            />
          }
          {<Gallery gallery={gallery.value[0].images.value} />}
          {<AboutComponent about={about.value[0]} />}
          {showMessage && (
            <div className="popup-message-container">
              <p>{homePage.value[0].bannerMessage.value}</p>
              <button
                type="button"
                className="close"
                onClick={(): void => this.setState({ showMessage: false })}
              >
                <span>X</span>
              </button>
            </div>
          )}
        </React.Fragment>
      );
    } else if (this.state != null && this.state.error) {
      return (
        <React.Fragment>
          <script src="https://kit.fontawesome.com/6128e76e98.js" />
          <div className="error-wrapper">
            <h2>500</h2>
            <p>Whoops, something broke. Check back soon!</p>
          </div>
        </React.Fragment>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default App;
