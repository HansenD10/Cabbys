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
        contact: {},
        hours: {},
        events: [],
        menu: {
          foods: [],
          drinks: [],
        }
      }
    }
  }

  async componentWillMount() {
    let { pathname } = window.location
    let all 

    if (pathname !== '/')
      all = await axios.get("../api/all")
    else {
      all = await axios.get("./api/all")
    }
    
    this.setState({data: all.data})
  }

  render() {
    let { location } = this.props
    let { events, hours, menu, contact } = this.state.data
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
              <Route exact path="/menu" render={() => <Menu menu={menu} />} /> 
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
