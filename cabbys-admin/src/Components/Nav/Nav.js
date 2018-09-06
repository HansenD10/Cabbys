import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../../Styles/Nav.css'

export default class Nav extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="banner-logo"></div>
          <h1>Cabby's Admin</h1>
        </div>
        <div className="drawer">
         <div className="nav-links">
            <h2 className="nav-link">Basic</h2>
            <hr className="divider" />
            <h2 className="nav-link">Menu</h2>
            <hr className="divider" />
            <h2 className="nav-link">Events</h2>
          </div>
        </div>
      </div>
    )
  }
}
