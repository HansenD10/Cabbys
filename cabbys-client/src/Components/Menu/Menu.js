import React, { Component } from 'react'
import MenuCategory from './MenuCategory'
import MenuContent from './MenuContent'
import BI from '../../Images/ribs.jpg'
import '../../Styles/Menu.css'
import { Loading } from '..';

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCat: 1
    }
  }

  selectCat = (cat) => {
    this.setState({ selectedCat: cat })
  }

  render() {
    let { selectedCat } = this.state
    let { foods } = this.props

    return (
      BI ? (
        <div className="menu-page-wrapper wrapper" style={{ backgroundImage: `url(${BI})` }}>
          <div className="menu-wrapper page-block">
            <MenuCategory foods={foods} selectedCat={selectedCat} selectCat={this.selectCat}/>
            <MenuContent list={foods[selectedCat - 1]} />
          </div>
        </div>
      ) : (
        <Loading />
      )
    )
  }
}
