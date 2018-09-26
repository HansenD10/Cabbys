import React, { Component } from 'react'
import isAuthenticated from '../../Auth/isAuthenticated'
import { Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Basic from '../Basic/Basic'

export default class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentPage: 'Basic'
    }
  }

  render() {
    let { contentPage } = this.state
    let { hours, contact } = this.props

    if(isAuthenticated()) {
      return (
        <div>
          <Nav />
          {contentPage === 'Basic' && hours && <Basic hours={hours} contact={contact} />}
        </div>
      )
    } 
    else {
      return (
        <Redirect to='/admin/login' />
      )
    }
  }
}
