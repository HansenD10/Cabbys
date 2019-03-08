import React, { Component } from 'react';
import { Nav, HomePage, About, EventsPage, Menu } from './Components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import GA from './Utils/GoogleAnalytics';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        contact: {},
        hours: {},
        events: [],
        foods: [],
      }
    };
  }

  async componentWillMount() {
    const { pathname } = window.location;
    let all;

    if (pathname !== '/')
      all = await axios.get("http://www.cabbysgrillandpatio.com/api/all");
    else {
      all = await axios.get("http://www.cabbysgrillandpatio.com/api/all");
    }

    this.setState({ data: all.data });
  }
  render() {
    const { location } = this.props;
    const { events, hours, foods, contact } = this.state.data;

    return (
      <div>
        {GA.init() && <GA.RouteTracker />}
        <Nav updateSelected={this.updateSelected} />
        <TransitionGroup>
          <CSSTransition
            key={window.location.pathname}
            timeout={1000}
            classNames="fade">
            <Switch location={location}>
              <Route exact path="/" render={() => hours && <HomePage hours={hours} />} />
              <Route exact path="/menu" render={() => foods.length && <Menu foods={foods} />} />
              <Route exact path="/events" render={() => events && <EventsPage events={events} />} />
              <Route exact path="/about" render={() => <About contact={contact} />} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}
