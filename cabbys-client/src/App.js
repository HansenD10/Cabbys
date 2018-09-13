import React, { Component } from 'react'
import { Nav, HomePage, About, EventsPage, Menu } from './Components'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import axios from 'axios'
import GA from './Utils/GoogleAnalytics';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        foods: [],
        drinks: [],
        events: [],
        contact: []
      }
    }
  }

  async componentWillMount() {
    let foods = await axios.get("./api/foods"),
    drinks = await axios.get("./api/drinks"),
    events = await axios.get("./api/events"),
    contact = await axios.get("./api/contact"),
    hours = await axios.get("./api/hours")

    this.setState({
      data: {
        foods: foods.data,
        drinks: drinks.data,
        events: events.data,
        contact: contact.data[0],
        hours: hours.data
      }
    })
  }

  render() {
    let { location } = this.props
    let { events, hours, foods, drinks, contact } = this.state.data
    return (
      <div>
        { GA.init() && <GA.RouteTracker />}
        <Nav updateSelected={this.updateSelected} />
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={200}
            classNames="fade">
            <Switch location={location}>
              <Route exact path="/" render={() => <HomePage hours={hours} />} />
              <Route exact path="/menu" render={() => <Menu foods={foods} drinks={drinks}/>} /> 
              <Route exact path="/events" render={() => <EventsPage events={events} />} />
              <Route exact path="/about" render={() => <About contact={contact} />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default App;
