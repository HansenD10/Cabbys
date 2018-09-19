import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import Login from './Auth/Login'
import Admin from './Components/Admin/Admin'

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
    let foods = await axios.get("../api/foods"),
      drinks = await axios.get("../api/drinks"),
      events = await axios.get("../api/events"),
      contact = await axios.get("../api/contact"),
      hours = await axios.get("../api/hours")

    this.setState({
      ...this.state,
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
    let { data } = this.state

    return (
      <div className="container">
        <Switch>
          <Route exact path="/admin" render={() => <Admin hours={data.hours} contact={data.contact} />} />
          <Route exact path="/admin/login" component={Login} />
          <Route path="" render={() => <Redirect to='/admin/login' />} />
        </Switch>
      </div>
    )
  }
}

export default App;
