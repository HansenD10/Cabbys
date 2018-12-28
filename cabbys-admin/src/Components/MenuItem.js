import React, { Component } from 'react';
import { Card, Icon, Row, Col, Button } from 'antd';
import NewItem from './NewItem';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItemVisible: false
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleCancel() {
    this.setState({ newItemVisible: !this.state.newItemVisible });
  }

  handleOk(newItem) {
    const { itemChange, foods } = this.props;
    this.setState({ newItemVisible: !this.state.newItemVisible });
    itemChange(newItem, foods.category);
  }

  render() {
    const { foods, itemChange } = this.props;
    const { newItemVisible } = this.state

    return (
      <Row
        type='flex'
        justify='space-around'>
        {foods && foods.items.map(food => {
          return (
            <Col
              key={food.name}
              style={{ padding: '10px' }}
              span={7}>
              <Card
                style={{ height: '300px', display: 'flex', flexDirection: 'column' }}
                title={`${food.name}  -  ${food.price}`}
                actions={[<Icon type='close' onClick={() => itemChange(food, foods.category, true)} />]}
                bodyStyle={{ flexGrow: '1' }}>
                <p>{food.description}</p>
              </Card>
            </Col>
          )
        }
        )}
        <Col
          style={{ padding: "10px" }}
          span={8}>
          <Card
            style={{
              height: '300px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
            <Row type='flex'>
              <Button
                icon="plus"
                type="primary"
                size="large"
                style={{ margin: '1rem auto' }}
                onClick={() => this.setState({ newItemVisible: !newItemVisible })}
              >{`New ${foods && foods.category}`}</Button>
            </Row>
            <Row type='flex'>
              <Button
                icon="minus"
                type="danger"
                size="large"
                style={{ margin: '1rem auto' }}
                onClick={() => this.props.categoryChange(foods && foods.category, true)}
              >{`Remove ${foods && foods.category}`}</Button>
            </Row>
          </Card>
        </Col>
        <NewItem
          visible={newItemVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel} />
      </Row>
    );
  }
}