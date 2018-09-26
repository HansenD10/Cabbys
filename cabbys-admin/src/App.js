import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import Login from './Auth/Login'
import Admin from './Components/Admin/Admin'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  async componentWillMount() {
    let all = await axios.get('/api/all')
    this.setState({data: all.data})
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
