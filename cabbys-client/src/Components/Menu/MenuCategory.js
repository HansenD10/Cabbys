import React, { Component } from 'react'

export default class MenuCategory extends Component {

  selectCat = (cat) => {
    this.props.selectCat(cat)
  }

  render() {
    let { selectedCat } = this.props

    return (
      <div className="menu-cat-wrapper">
        <div 
          onClick={this.selectCat.bind(this, 0)}
          key={0} 
          className={`category-wrapper ${selectedCat === 0 ? 'active-cat' : ''}`}>
          <p className="category-text">Drinks</p>
        </div>
        {this.props.foods.map((food, i) => {
          return (
            <div 
              onClick={this.selectCat.bind(this, i+1)}
              key={i+1} 
              className={`category-wrapper ${selectedCat === i+1 ? 'active-cat' : ''}`}>
              <p className="category-text">{food.category}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
