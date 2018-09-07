import React, { Component } from 'react'
import Hours from './Hours/Hours'

export default class Basic extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <Hours hours={this.props.hours}/>
      </div>
    )
  }
}
