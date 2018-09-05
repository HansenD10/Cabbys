import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      username: '',
      pass: ''
    }

    this.updateUsername = this.updateUsername.bind(this)
    this.updatePass = this.updatePass.bind(this)
  }

  updateUsername = (e) => {
    this.setState({username: e.target.value})
  }

  updatePass = (e) => {
    this.setState({pass: e.target.value})
  }

  render() {
    return (
      <div>
        <div className="logo"></div>
        <form onSubmit={this.props.onSubmit.bind(this)} className="login-wrapper">
          <div className="form-group row">
            <input onChange={this.updateUsername} type="username" className="form-control" placeholder="Username" />
          </div>
          <div className="form-group row">
            <input onChange={this.updatePass} type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="form-group row">
            <button className="btn btn-primary mx-auto">Login</button>
          </div>
        </form>
      </div>
    )
  }
}
