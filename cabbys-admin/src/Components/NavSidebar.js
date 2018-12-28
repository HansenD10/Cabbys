import React, { Component } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';

export default class NavSidebar extends Component {
  render() {
    const { changePage, loggedIn } = this.props;

    return (
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          defaultSelectedKeys={["Contact"]}
          mode="inline"
          style={{ height: '100%', borderRight: 0 }} >
          <Menu.Item
            onClick={changePage.bind(this)}
            key="Contact"
            disabled={loggedIn}
          >Contact</Menu.Item>
          <Menu.Item
            onClick={changePage.bind(this)}
            key="Hours"
            disabled={loggedIn}
          >Hours</Menu.Item>
          <Menu.Item
            onClick={changePage.bind(this)}
            key="Menu"
            disabled={loggedIn}
          >Menu</Menu.Item>
          <Menu.Item
            onClick={changePage.bind(this)}
            key="Events"
            disabled={loggedIn}
          >Events</Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
