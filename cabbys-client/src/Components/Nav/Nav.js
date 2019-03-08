import React, { Component } from 'react';
import Toggle from './Toggle';
import { NavLink } from 'react-router-dom';
import '../../Styles/Nav.scss';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };

    this.selectToggle = this.selectToggle.bind(this);
  }

  selectToggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }
  
  render() {
    const { toggle } = this.state;

    return (
      <div className="nav-wrapper">
        <div className="nav-links">
          <NavLink exact to="/" className="nav-link">Home</NavLink>
          <NavLink exact to="/menu" className="nav-link">Menu</NavLink>
          <NavLink exact to="/events" className="nav-link">Events</NavLink>
          <NavLink exact to="/about" className="nav-link">About</NavLink>
        </div>
        <div className={`drop-down ${toggle ? 'drop-down-open' : ''}`}>
          <div className="dropdown-logo"></div>
          <hr className="menu-divider" />
          <div className="dropdown-links">
            <NavLink exact to="/" onClick={() => this.setState({toggle: false})} className="dropdown-link">Home</NavLink>
            <NavLink exact to="/menu" onClick={() => this.setState({toggle: false})} className="dropdown-link">Menu</NavLink>
            <NavLink exact to="/events" onClick={() => this.setState({toggle: false})} className="dropdown-link">Events</NavLink>
            <NavLink exact to="/about" onClick={() => this.setState({toggle: false})} className="dropdown-link">About</NavLink>
          </div>
        </div>
        <Toggle selectToggle={this.selectToggle} toggle={toggle} />
      </div>
    );
  }
}
