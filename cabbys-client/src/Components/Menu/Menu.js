import React, { Component } from 'react'
import MenuCategory from './MenuCategory'
import MenuContent from './MenuContent'
import '../../Styles/Menu.css'

export default class Menu extends Component {
  render() {
    let { foods } = this.props
    return (
      <div className="menu-wrapper wrapper">
        <MenuCategory foods={foods} />
        <MenuContent /> 
      </div>
    )
  }
}
