import React, { Component } from 'react'
import { Layout, Row, Divider } from 'antd'
import CtrlBtnGroup from './CtrlBtnGroup'
import MenuCategories from './MenuCategories';

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: props.menu,
      changed: false
    }

  }

  categoryChange(newCat, remove = false) {
    let menu = Object.assign({}, this.state.menu)
    if(!remove) {
      let menuCatLength = Object.keys(menu.foods).length
      menu.foods[menuCatLength + 1] = { _id: menuCatLength + 1, category: newCat, items: [] }
      
      this.setState({ menu, changed: true })
    }
    else {

    }
  }

  reset() { 
    console.log(this.state.menu)
    this.setState({ menu: this.state.menu, changed: false })
  }

  update() {
    console.log('Update')
  }

  render() {
    let { foods } = this.props.menu
    return (
      <Layout style={{ background: '#fff' }}>
        <Row style={{ textAlign: 'center', paddingTop: '24px' }}>
          <h1>Menu</h1>
        </Row>
        <Divider />
        <MenuCategories foods={foods} categoryChange={this.categoryChange.bind(this)} />
        <Divider />
        <Row>
          <CtrlBtnGroup reset={this.reset.bind(this)} update={this.update} isHidden={this.state.changed}/>
        </Row>
      </Layout>
    )
  }
}
