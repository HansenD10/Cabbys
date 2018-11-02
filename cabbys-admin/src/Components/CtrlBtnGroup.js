import React, { Component } from 'react'
import { Row, Col, Button } from 'antd';

export default class CtrlBtnGroup extends Component {
  render() {
    let { isHidden, reset, update } = this.props

    const hide = {display: isHidden ? '' : 'none', height: "10%", justifyContent: "space-evenly"}
    return (
      <Row 
        style={hide}>
        <Col 
          style={{ display: "flex", justifyContent: "space-evenly"}}
          span="12">
          <Button 
            type="primary"
            onClick={update}
            >Update</Button>
        </Col>
        <Col 
          style={{ display: "flex", justifyContent: "space-evenly"}}
          span="12">      
          <Button 
            type="danger"
            onClick={reset}
            >Reset</Button>
        </Col>
      </Row>
    )
  }
}
