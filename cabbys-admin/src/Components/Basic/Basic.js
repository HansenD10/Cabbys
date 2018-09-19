import React, { Component } from 'react'
import Hours from './Hours/Hours'
import About from './Contact/About'

export default class Basic extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <Hours hours={this.props.hours}/>
        <About contact={this.props.contact} />
      </div>
    )
  }
}
