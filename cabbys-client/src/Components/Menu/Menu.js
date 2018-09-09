import React, { Component } from 'react'
import MenuCategory from './MenuCategory'
import MenuContent from './MenuContent'
import '../../Styles/Menu.css'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCat: 0
    }
  }

  selectCat = (cat) => {
    this.setState({ selectedCat: cat })
  }

  render() {
    let { selectedCat } = this.state
    let { foods, drinks } = this.props
    return (
      <div className="menu-page-wrapper wrapper">
        <div className="menu-wrapper page-block">
          <MenuCategory foods={foods} selectedCat={selectedCat} selectCat={this.selectCat}/>
          <MenuContent list={selectedCat === 0 ? drinks : foods[selectedCat - 1]} />
        </div>
      </div>
    )
  }
}
