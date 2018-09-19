import React, { Component } from 'react'
import Hours from './Hours/Hours'
import Contact from './Contact/Contact'

export default class Basic extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <Hours hours={this.props.hours}/>
        <Contact contact={this.props.contact} />
      </div>
    )
  }
}
