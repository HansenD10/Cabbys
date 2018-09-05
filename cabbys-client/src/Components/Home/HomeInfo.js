import React, { Component } from 'react'
import '../../Styles/HomeInfo.css'
import Hours from './Hours';
import Location from './Location';

export default class HomeInfo extends Component {
  render() {
    let { hours } = this.props

    return (
      <div className="home-info">
        <Hours hours={hours} />
        <Location />
      </div>
    )
  }
}
