import React, { Component } from 'react';
import { Row, Tag, Input, Icon, message } from 'antd';

const CheckableTag = Tag.CheckableTag;

export default class MenuCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      newCatValue: ''
    };

    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }

  handleInputConfirm(e) {
    const { categoryChange } = this.props;
    const { newCatValue } = this.state;

    if (newCatValue) {
      categoryChange(newCatValue);

      this.setState({
        inputVisible: false,
        newCatValue: '',
      });
    }
    else {
      message.error('Please enter a category.');
    }
  }

  render() {
    let { inputVisible, newCatValue } = this.state;
    let { selectCategory, selectedCat, foods } = this.props;

    return (
      <Row style={{ justifyContent: 'space-evenly', display: 'flex' }}>
        {foods.map((item) => {
          return (
            <CheckableTag
              checked={selectedCat === item.category ? true : false}
              onChange={() => selectCategory(item.category)}
              key={item.category}>{item.category}</CheckableTag>
          )
        })}
        {inputVisible && (
          <Input
            type='text'
            size='small'
            style={{ width: 78 }}
            value={newCatValue}
            onChange={e => this.setState({ newCatValue: e.target.value })}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={() => this.setState({ inputVisible: !inputVisible })}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type='plus' /> New Tag
          </Tag>
        )}
      </Row>
    );
  }

}
