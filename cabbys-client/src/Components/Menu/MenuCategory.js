import React, { Component } from 'react'

export default class MenuCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCat: 0
    }
  }

  selectCat = (cat) => {
    this.setState({selectedCat: cat})
  }

  render() {
    return (
      <div className="menu-cat-wrapper">
        <div 
          onClick={this.selectCat.bind(this, 0)}
          key={0} 
          className={`category-wrapper ${this.state.selectedCat === 0 ? 'active-cat' : ''}`}>
          <p className="category-text">Drinks</p>
        </div>
        {this.props.foods.map((food, i) => {
          return (
            <div 
              onClick={this.selectCat.bind(this, i+1)}
              key={i+1} 
              className={`category-wrapper ${this.state.selectedCat === i+1 ? 'active-cat' : ''}`}>
              <p className="category-text">{food.category}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
