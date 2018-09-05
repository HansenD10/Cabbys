import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Basic from './Components/Basic/Basic';

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
    return (
      <div className="container">
        <NavBar />
        <Route exact path="/" component={Basic}/>
      </div>
    );
  }
}

export default App;
