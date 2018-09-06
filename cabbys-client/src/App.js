import React, { Component } from 'react'
import { Nav, Home, About, Events } from './Components'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import axios from 'axios'

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
        contact: contact.data,
        hours: hours.data
      }
    })
  }

  render() {
    let { location } = this.props
    let { events, hours } = this.state.data
    return (
      <div>
        <Nav updateSelected={this.updateSelected} />
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={200}
            classNames="fade">
            <Switch location={location}>
              <Route exact path="/" render={() => <Home hours={hours} />} />
              {/* <Route exact path="/Menu" render={() => <Menu foods={foods} />} />  */}
              <Route exact path="/events" render={() => <Events events={events} />} />
              <Route exact path="/about" component={About} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default App;
