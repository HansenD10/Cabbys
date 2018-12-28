import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';

export default class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        price: '',
        description: ''
      }
    };

    this.emptyForm = Object.assign({}, this.state.form);
  }

  render() {
    const { name, price, description } = this.state.form;
    const { visible, handleCancel, handleOk } = this.props;

    return (
      <Modal title='New Item'
        visible={visible}
        onOk={() => {
          const { name, price, description } = this.state.form;
          if (name && price && description) {
            handleOk(...arguments, this.state.form);
            this.setState({ form: this.emptyForm });
          }
          else {
            message.error('Please Fill out all the info.');
          }
        }}
        onCancel={handleCancel}>
        <Form>
          <Form.Item
            wrapperCol={{ span: 21 }}
            labelCol={{ span: 3 }}
            label='Name'>
            <Input
              required
              onChange={(e) => this.setState({
                form: {
                  ...this.state.form,
                  name: e.target.value
                }
              })}
              value={name}
              name='name' />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 21 }}
            labelCol={{ span: 3 }}
            label='Price'>
            <Input
              required
              onChange={(e) => this.setState({
                form: {
                  ...this.state.form,
                  price: e.target.value
                }
              })}
              value={price}
              addonBefore="$"
              name='price' />
          </Form.Item>
          <Form.Item
            label='Description'>
            <Input.TextArea
              required
              onChange={(e) => this.setState({
                form: {
                  ...this.state.form,
                  description: e.target.value
                }
              })}
              value={description}
              name='description' />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
