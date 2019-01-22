import React, { Component } from 'react'
import { Loading, Nav, HomePage, About, EventsPage, Menu } from './Components'
import { Route, Switch, Redirect } from 'react-router-dom'
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
        foods: [],
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
    let { events, hours, foods, contact } = this.state.data
    return (
      <div>
        { GA.init() && <GA.RouteTracker />}
        <Nav updateSelected={this.updateSelected} />
        <TransitionGroup>
          <CSSTransition
            key={window.location.pathname}
            timeout={1000}
            classNames="fade">
            <Switch location={location}>
              <Route exact path="/" render={() => hours ? <HomePage hours={hours} /> : <Loading />} />
              <Route exact path="/menu" render={() => foods[0] ? <Menu foods={foods} /> : <Loading />} /> 
              <Route exact path="/events" render={() => events && <EventsPage events={events} />} />
              <Route exact path="/about" render={() => contact ? <About contact={contact} /> : <Loading />} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default App;
