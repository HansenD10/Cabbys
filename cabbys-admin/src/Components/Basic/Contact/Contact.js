import React, { Component } from 'react'
import '../../../Styles/Contact.css'

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChanged: false
    }
  }
  
  render() {
    let { isChanged } = this.state

    return (
      <div className="contact-wrapper">
        <div className="contact-header">
          <h3>Contact Information</h3>
          {isChanged ? (
          <div className="hours-btn-group">
            <p 
              className="update-btn"
              onClick={this.updateHours}>Update</p>
            <p
              className="reset-btn">Reset</p>
          </div>
          ) : (
            null
          )}
        </div>
      </div>
    )
  }
}
