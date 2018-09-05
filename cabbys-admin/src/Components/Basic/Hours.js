import React, { Component } from 'react'

export default class Hours extends Component {
  render() {
    return (
      <div className="hours-wrapper">
        <div className="hours-header">
          <h1>Hours</h1>
        </div>
        <div className="hours-form">
          <div className="form-group">
            <h3>Monday </h3>
            <input name="monday"></input>
          </div>
          <h3>Tuesday </h3>
          <h3>Wednesday</h3>
          <h3>Thursday</h3>
          <h3>Friday</h3>
          <h3>Saturday</h3>
          <h3>Sunday</h3>
        </div>
      </div>
    )
  }
}
