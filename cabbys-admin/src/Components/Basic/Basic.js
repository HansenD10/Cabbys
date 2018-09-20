import React, { Component } from 'react'
import Hours from './Hours/Hours'
import About from './About/About'
import ContactLinks from './ContactLinks/ContactLinks'

export default class Basic extends Component {
  render() {
    let { hours, contact } = this.props 

    return (
      <div className="content-wrapper">
        <Hours hours={hours}/>
        <About contact={contact} />
        <ContactLinks contact={contact} />
      </div>
    )
  }
}
