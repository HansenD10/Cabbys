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
    if(isAuthenticated()) {
      return (
        <div>
          <Nav />
          {contentPage === 'Basic' && this.props.hours && <Basic hours={this.props.hours[0].hours} contact={this.props.contact} />}
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
