import React, { Component } from 'react';
import '../../Styles/HomeInfo.scss';
import Hours from './Hours';
import Location from './Location';

export default class HomeInfo extends Component {
  render() {
    const { hours } = this.props;

    return (
      <div className="home-info">
        <Hours hours={hours} />
        <Location />
      </div>
    );
  }
}
