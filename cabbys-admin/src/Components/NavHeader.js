import React, { Component } from 'react';
import { Col, Row } from 'antd';
import logo from '../Images/CabbysLogo.png';

export default class NavHeader extends Component {
  render() {
    return (
      <Row
        type='flex'
        justify='space-between'
        align='middle'
        style={{ backgroundColor: '#001529', padding: '1rem' }} >
        <Col span={4} >
          <img src={logo} alt="Cabbys Logo" className="logo" />
        </Col>
        <Col span={2}
          style={{ color: '#fff' }}
          onClick={() => this.props.logOut()}
        >
          {this.props.loggedIn ? null : <Col style={{ cursor: 'pointer', backgroundColor: '#001529' }}>Logout</Col>}
        </Col>
      </Row>
    )
  }
}
