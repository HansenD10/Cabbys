import React, { Component } from 'react'
import { Row, Tag, Input, Icon } from 'antd'

export default class MenuCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false,
      selectedCat: 'Brunch',
      newCatValue: '',
      categories: props.foods.map(item => item.category)
    }

    this.handleInputConfirm = this.handleInputConfirm.bind(this)
  }

  handleInputConfirm(e) {
    this.setState({ 
      inputVisible: false, 
      newCatValue: '', 
      categories: [...this.state.categories, this.state.newCatValue] 
    })
  }

  handleClose(cat) {
    this.setState({
      categories: this.state.categories.filter(item => item !== cat)
    })
    console.log(this.state.categories)
  }

  selectCategory(cat) {
    this.setState({ selectedCat: cat })
  }

  render() {
    let { inputVisible, newCatValue, selectedCat, categories } = this.state

    return (
      <Row style={{ justifyContent: 'space-evenly', display: 'flex' }}>
          <Tag>Drinks</Tag>
          {categories.map((item) => {
            return (
              <Tag.CheckableTag
                checked={selectedCat === item ? true : false}
                onChange={this.selectCategory.bind(this, item)}
                onClose={this.handleClose.bind(this, item)}
                closable={true}
                key={item}>{item}</Tag.CheckableTag>
            )
          })}
          {inputVisible && (
          <Input
            type="text"
            size="small"
            style={{ width: 78 }}
            value={newCatValue}
            onChange={e => this.setState({newCatValue: e.target.value})}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={() => this.setState({ inputVisible: !inputVisible })}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
        </Row>
    )
  }
}
