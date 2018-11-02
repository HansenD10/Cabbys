import React, { Component } from 'react'
import { Layout } from 'antd'
import isAuthenticated from './Auth/isAuthenticated'
import NavHeader from './Components/NavHeader'
import NavSidebar from './Components/NavSidebar'
import Contact from './Components/Contact'
import Lock from './Auth/Lock'
import axios from 'axios'
import Hours from './Components/Hours';
import Menu from './Components/Menu'

const { Content } = Layout;

export default class App extends Component {  
  constructor() {
    super()
    this.state = {
      content: "Login",
      data: {}
    }
    
    this.logout = this.logout.bind(this)
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')

    this.setState({ content: "Login" })
  }
  
  async componentDidMount() {
    isAuthenticated() && this.setState({ content: "Contact"})
    
    let all = await axios.get('/api/all')
    this.setState({data: all.data})
  }
  
  renderContent() {
    let { contact, hours, menu } = this.state.data

    switch(this.state.content) {
      case 'Login':
        return <Lock 
          style={{height: "100%"}} 
          logIn={() => this.setState({content: 'Contact'})}
          logOut={this.logout} />
      
      case 'Contact':
        return contact && <Contact contact={contact} />

      case 'Hours':
        return hours && <Hours hours={hours} />
      
      case 'Menu':
        return menu && <Menu menu={menu} />
      
      default:
        break
    }
  }

  render() {
    console.log("App refresh")
    return (
      <Layout style={{height: "100%"}}>
        <NavHeader 
          loggedIn={this.state.content === "Login"}
          logOut={this.logout}/>
        <Layout>
          <NavSidebar 
            loggedIn={this.state.content === "Login"}
            changePage={(e) => this.setState({content: e.key})}/>
          <Layout style={{ padding: '24px' }}>
            <Content style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-around' }}>
              {this.renderContent()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}     
