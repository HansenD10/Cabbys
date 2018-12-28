import React, { Component } from 'react';
import { Layout } from 'antd';
import NavHeader from './Components/NavHeader';
import NavSidebar from './Components/NavSidebar';
import Contact from './Components/Contact';
import Lock from './Auth/Lock';
import axios from 'axios';
import Hours from './Components/Hours';
import Menu from './Components/Menu';
import Events from './Components/Events';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      content: 'Login',
      data: {}
    };

    this.updateData = this.updateData.bind(this);
    this.checkToken = this.checkToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  checkToken() {
    setTimeout(() => {this.logout()}, 3600000)
  }

  logout() {
    console.log('Logout')
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('menu');
    

    this.setState({ content: 'Login' });
  }

  async updateData() {
    let all = await axios.get('/api/all');
    this.setState({ data: all.data });
  }

  async componentDidMount() {
    localStorage.getItem('expires_in') && this.setState({ content: 'Contact' });

    let all = await axios.get('/api/all');
    this.setState({ data: all.data });
  }

  renderContent() {
    const { contact, hours, menu, events } = this.state.data;

    switch (this.state.content) {
      case 'Login':
        return <Lock
          style={{ height: '100%' }}
          logIn={() => this.setState({ content: 'Contact' })}
          logOut={this.logout} />

      case 'Contact':
        return contact && <Contact contact={contact} checkToken={this.checkToken} />

      case 'Hours':
        return hours && <Hours hours={hours} />

      case 'Menu':
        return menu && <Menu menu={menu} updateData={this.updateData} />

      case 'Events':
        return events && <Events events={events} updateData={this.updateData} />

      default:
        break
    }
  }

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <NavHeader
          loggedIn={this.state.content === "Login"}
          logOut={this.logout} />
        <Layout>
          <NavSidebar
            loggedIn={this.state.content === "Login"}
            changePage={(e) => this.setState({ content: e.key })} />
          <Layout style={{ padding: '1.5rem' }}>
            {this.renderContent()}
          </Layout>
        </Layout>
      </Layout>
    )
  }
}     
