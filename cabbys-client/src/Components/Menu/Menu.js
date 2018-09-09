import React, { Component } from 'react'
import MenuCategory from './MenuCategory'
import MenuContent from './MenuContent'
import '../../Styles/Menu.css'

export default class Menu extends Component {
  render() {
    let { foods } = this.props
    return (
      <div className="menu-page-wrapper wrapper">
        <div className="menu-wrapper page-block">
          <MenuCategory foods={foods} />
          <MenuContent />
        </div>
      </div>
    )
  }
}
