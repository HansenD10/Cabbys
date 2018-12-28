import React, { Component } from 'react';
import AUTH_CONFIG from './auth0-variables';
import auth0 from 'auth0-js';
import { Layout, Form, Row, Input, Icon, Button, Divider } from 'antd';
import logo from '../Images/CabbysLogo.png';
import '../Styles/Login.css';

const FormItem = Form.Item;
const Content = Layout.Content;

export default class Lock extends Component {

  constructor(props) {
    super(props);
    this.lock = new auth0.Authentication({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId
    });
  }

  onAuthenticated(e) {
    e.preventDefault();


    this.lock.login({
      realm: 'Username-Password-Authentication',
      username: e.target.user.value,
      password: e.target.pass.value,
    }, (error, data) => {
      if (error) {
        console.log(error);
      }
      else {
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('id_token', data.idToken);

        this.props.logIn();
      }
    })
  }

  render() {
    return (
      <Content style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }}>
        <Row
          style={{ margin: 'auto' }}>
          <Form
            onSubmit={this.onAuthenticated.bind(this)}
            className="login-form">
            <img src={logo} alt="Cabbys Logo" />
            <h1>Cabby's Admin</h1>
            <Divider />
            <FormItem>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="user"
                placeholder="Username" />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="pass"
                type="password"
                placeholder="Password" />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
        </Row>
      </Content>
    )
  }
}
