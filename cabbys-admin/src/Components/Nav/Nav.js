import React, { Component } from 'react'
import '../../Styles/Nav.css'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }


  render() {
    return (
      <div>
        <div className="drawer">
          <div className="header">
            <div className="banner-logo"></div>
            <p>Cabby's Admin</p>
          </div>
          <div className="nav-links">
            <p className="nav-link active">Basic</p>
            <hr className="divider" />
            <p className="nav-link">Menu</p>
            <hr className="divider" />
            <p className="nav-link">Events</p>
          </div>
        </div>
      </div>
    )
  }
}
