import React, { Component } from 'react'
import { Layout, Col, Row, Form, Input, Divider } from 'antd';
import CtrlBtnGroup from './CtrlBtnGroup';
import axios from 'axios';

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: props.contact,
      changed: false
    }

    this.update = this.update.bind(this)
    this.reset = this.reset.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  update() {
    let { contact } = this.state

    axios
      .put('../api/contact', { 
          data: contact
        }, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token')}
        })
      .then(() => this.setState({ changed: false }))
      .catch(e => console.log(e))
  }

  reset() {
    this.setState({contact: this.props.contact, changed: false})
  }

  onChange(e) {
    let contact = Object.assign({}, this.state.contact)
    contact[e.target.name] = e.target.value
    this.setState({ contact, changed: true })
  }
  
  render() {
    const { contact } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <Layout style={{ backgroundColor: '#fff' }}>
        <h1 style={{ textAlign: 'center', marginTop: '24px' }}>Contact Information</h1>
        <Divider />
        <Row>
          <Col span="10">
            <div style={{ margin: "auto" }}>
              {Object.keys(contact).map(
                (item) => {
                  let label = item.charAt(0).toUpperCase() + item.slice(1)
                  if (contact[item] !== contact.content) {
                    return (
                      <Form.Item
                        {...formItemLayout}
                        key={item}
                        label={label}>
                        <Input 
                          name={item}
                          onChange={this.onChange}
                          value={contact[item]}
                        />
                      </Form.Item>
                    )
                  }
                  else {
                    return null
                  }
                }
              )}
            </div>
          </Col>
          <Col span="10">
            <Form.Item
              {...formItemLayout}
              key='content'
              label='Content'>
              <Input.TextArea
                name='content'  
                onChange={this.onChange}
                value={contact.content}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <CtrlBtnGroup reset={this.reset} update={this.update} isHidden={this.state.changed} />
      </Layout>
    )
  }
}
