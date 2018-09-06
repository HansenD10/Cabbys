import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { AUTH_CONFIG } from './auth0-variables'
import Auth0Lock from 'auth0-lock'
import logo from '../Images/CabbysLogo.png'

class Lock extends Component {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    auth: {
      responseType: 'token id_token',
      sso: false
    },
    container: AUTH_CONFIG.container,
    theme: {
      primaryColor: '#3a99d8',
      logo
    },
    languageDictionary: {
      title: "Cabby's Admin"
    },
    allowSignUp: false,
    allowForgotPassword: false,
    allowedConnections: ['Username-Password-Authentication']
  })

  constructor(props) {
    super(props)
    this.state = {loggedIn: false}
    this.onAuthenticated = this.onAuthenticated.bind(this)

    this.onAuthenticated()
  }

  onAuthenticated() {
    this.lock.on('authenticated', (authResult) => {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)

        this.setState({loggedIn: true})
    })
  }
  
  componentDidMount() {
    if (!(/access_token|id_token|error/.test(this.props.location.hash))) {
      this.lock.show()
    }
  }

  render() {
    let { loggedIn } = this.state

    return (
      !loggedIn ? (
        <div className="login-wrapper">
          <div id={AUTH_CONFIG.container}></div>
        </div>
      ) : (
        <Redirect to={{
          pathName:"/admin",
          state: {from: this.props.location}
        }} />
      )
    )
  }
}

export default Lock