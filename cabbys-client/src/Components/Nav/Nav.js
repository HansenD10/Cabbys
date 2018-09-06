import React, { Component } from 'react'
import Toggle from './Toggle'
import { NavLink } from 'react-router-dom'
import '../../Styles/Nav.css'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
  }

  selectToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }
  
  render() {
    let { toggle } = this.state
    return (
      <div className="nav-wrapper">
        <div className="nav-links">
          <NavLink exact to="/" className="nav-link">HOME</NavLink>
          <NavLink exact to="/menu" className="disabled nav-link">MENU</NavLink>
          <NavLink exact to="/events" className="nav-link">EVENTS</NavLink>
          <NavLink exact to="/about" className="nav-link">CONTACT US</NavLink>
        </div>
        <div className={`drop-down ${toggle ? 'drop-down-open' : ''}`}>
          <div className="dropdown-logo"></div>
          <hr className="menu-divider" />
          <div className="dropdown-links">
            <NavLink exact to="/" onClick={() => this.setState({toggle: false})} className="dropdown-link">HOME</NavLink>
            <NavLink exact to="/menu" onClick={() => this.setState({toggle: false})} className="disabled dropdown-link">MENU</NavLink>
            <NavLink exact to="/events" onClick={() => this.setState({toggle: false})} className="dropdown-link">EVENTS</NavLink>
            <NavLink exact to="/about" onClick={() => this.setState({toggle: false})} className="dropdown-link">ABOUT</NavLink>
          </div>
        </div>
        <Toggle selectToggle={this.selectToggle} toggle={toggle} />
      </div>
    )
  }
}
