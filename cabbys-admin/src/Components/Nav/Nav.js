import React, { Component } from 'react'
import '../../Styles/Nav.css'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'Basic'
    }
  }

  changePage = (page) => {
    this.setState({selected: page})
    this.props.changePage(page)
  }

  render() {
    let { selected } = this.state
    let { changePage } = this.props

    return (
      <div>
        <div className="drawer">
          <div className="header">
            <div className="banner-logo"></div>
            <p>Cabby's Admin</p>
          </div>
          <div className="nav-links">
            <p onClick={this.changePage.bind(this, 'Basic')} 
              className={`nav-link ${selected === 'Basic' ? 'active' : ''}`}>Basic</p>
            <hr className="divider" />
            <p onClick={this.changePage.bind(this, 'Menu')} 
              className={`nav-link ${selected === 'Menu' ? 'active' : ''}`}>Menu</p>
            <hr className="divider" />
            <p onClick={this.changePage.bind(this, 'Events')} 
              className={`nav-link ${selected === 'Events' ? 'active' : ''}`}>Events</p>
          </div>
        </div>
      </div>
    )
  }
}
