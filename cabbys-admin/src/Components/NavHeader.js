import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import logo from '../Images/CabbysLogo.png'

const { Header } = Layout

export default class NavHeader extends Component {
  render() {
    return (
      <Header>
        <img src={logo} alt="Cabbys Logo" className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ float: "right" }}
          onClick={() => this.props.logOut()}
          >
          { this.props.loggedIn ? null : <Menu.Item>Logout</Menu.Item> }
        </Menu>
      </Header>
    )
  }
}
