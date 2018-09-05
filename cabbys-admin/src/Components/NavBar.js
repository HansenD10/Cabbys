import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/Nav.css'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="banner-logo"></div>
          <h1>Cabby's Admin</h1>
        </div>
        <div className="drawer">
         <div className="nav-links">
            <NavLink exact to="/" className="nav-link">Basic</NavLink>
            <hr className="divider" />
            <NavLink exact to="/Menu" className="nav-link">Menu</NavLink>
            <hr className="divider" />
            <NavLink exact to="/Events" className="nav-link">Events</NavLink>
          </div>
        </div>
      </div>
    )
  }
}
