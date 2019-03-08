import React, { Component } from 'react';
import _ from 'lodash';

export default class Hours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedHours: []
    };
  }

  setHours = () => {
    return this.props.hours
      ? this.sortHours(this.props.hours)
      : null;
  }

  sortHours = (hours) => {
    let sortedHours = [];
    let prevDay = 'Sunday';
    let firstDay = 'Monday';
    let temp = {};
    _.forIn(hours, (value, key) => {
      if (hours[prevDay] !== value) {
        if (_.isEmpty(temp)) {
          temp = { day: key, time: value };
          firstDay = key;
        }
        else {
          sortedHours.push(temp);
          firstDay = key;
          temp = { day: key, time: value };
        }
      }
      else {
        temp = { day: firstDay + ' - ' + key, time: value };
      }
      prevDay = key;
    });
    sortedHours.push(temp);
    return sortedHours;
  }

  render() {
    const sortedHours = this.setHours();

    return (
      <div className="hours-wrapper">
        <hr />
        <h3 className="home-header">Hours</h3>
        <hr />
        <div className="hours-content">
          {sortedHours !== undefined && sortedHours.map((row) => {
            return (
              <p key={row.day}>{row.day} : {row.time}</p>
            )
          })}
        </div>
      </div>
    );
  }
}
