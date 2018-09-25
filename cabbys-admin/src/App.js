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
    let foods = await axios.get("http://localhost:8080/api/foods"),
      drinks = await axios.get("http://localhost:8080/api/drinks"),
      events = await axios.get("http://localhost:8080/api/events"),
      contact = await axios.get("http://localhost:8080/api/contact"),
      hours = await axios.get("http://localhost:8080/api/hours")

    this.setState({
      ...this.state,
      data: {
        foods: foods.data,
        drinks: drinks.data,
        events: events.data,
        contact: contact.data[0],
        hours: hours.data[0]
      }
    })
  }

  render() {
    let { data } = this.state

    return (
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Admin hours={data.hours} contact={data.contact} />} />
          <Route exact path="/login/" component={Login} />
          <Route path="" render={() => <Redirect to='/login/' />} />
        </Switch>
      </div>
    )
  }
}

export default App;
