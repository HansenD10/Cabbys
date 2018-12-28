import React, { Component } from 'react';
import { Layout, Col, Row, Form, Input, Divider, message } from 'antd';
import CtrlBtnGroup from './CtrlBtnGroup';
import axios from 'axios';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: props.contact,
      changed: false
    };

    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.checkToken()
  }

  update() {
    const { contact: data } = this.state;

    axios.put(
      '../api/contact',
      { data },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      }
    )
      .then(() => {
        this.setState({ changed: false });
        message.success('Contact Successfully Updated!');
      })
      .catch(e => {
        message.warning("Unable to Update. Log out and try again.");
      });
  }

  reset() {
    this.setState({ contact: this.props.contact, changed: false });
  }

  onChange(e) {
    let contact = Object.assign({}, this.state.contact);
    contact[e.target.name] = e.target.value;
    this.setState({ contact, changed: true });
  }

  render() {
    const { contact } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      }
    };

    return (
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Row>
          <Col>
            <CtrlBtnGroup
              reset={this.reset}
              update={this.update}
              isHidden={this.state.changed}
              header="Contact Information" />
            <Divider style={{ marginTop: '0' }} />
          </Col>
        </Row>
        <Row type='flex' justify='space-around' align='middle'>
          <Col span={10}>
            <div style={{ justifyContent: 'center' }}>
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
          <Col span={10}>
            <Form.Item
              {...formItemLayout}
              key='content'
              label='Content'>
              <Input.TextArea
                name='content'
                autosize={{ minRows: 15 }}
                onChange={this.onChange}
                value={contact.content}
              />
            </Form.Item>
          </Col>
        </Row>
      </Layout.Content>
    )
  }
}
