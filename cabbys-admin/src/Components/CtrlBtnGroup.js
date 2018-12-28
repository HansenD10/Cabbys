import React, { Component } from 'react';
import { Row, Button } from 'antd';

export default class CtrlBtnGroup extends Component {
  render() {
    const { isHidden, reset, update, header } = this.props;

    const hide = { visibility: isHidden ? 'visible' : 'hidden', margin: 'auto 0' }

    return (
      <Row
        style={{ display: 'flex', justifyContent: 'space-evenly', height: '100px' }}>
        <Button
          style={hide}
          type="primary"
          onClick={update}
        >Update</Button>
        <h1 style={{ textAlign: 'center', margin: 'auto 0' }}>{header}</h1>
        <Button
          style={hide}
          type="danger"
          onClick={reset}
        >Reset</Button>
      </Row>
    )
  }
}
