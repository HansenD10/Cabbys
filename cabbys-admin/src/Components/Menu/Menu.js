import React, { Component } from 'react'
import axios from 'axios'
import MenuCategories from './MenuCategories'
import CategoryInput from './CategoryInput'
import MenuTiles from './MenuTiles'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: [],
      isNewCategory: false,
      selectedCategory: ""
    }
  }

  componentWillMount() {
    this.getMenu()
  }

  showCategoryInput = () => {
    this.setState({
      isNewCategory: !this.state.isNewCategory
    })
  }

  getMenu = () => {
    axios.get("http://localhost:8080/menu")
      .catch(err => console.log(err))
      .then(response => {
        this.setState({ menu: response.data })
      })
  }

  selectCategory = (selectedCategory) => {
    this.setState({
      selectedCategory
    })
  }

  render() {
    let { menu, isNewCategory, selectedCategory } = this.state
    return (
      <div>
        <h1>Menu Editor</h1>
        {menu !== [] && <MenuCategories
          menu={menu}
          showCategoryInput={this.showCategoryInput}
          selectCategory={this.selectCategory}
          isNewCategory={isNewCategory}
          getMenu={this.getMenu} />}

          <CategoryInput 
            isNewCategory={this.state.isNewCategory}
            menuLength={this.state.menu.length}
            getMenu={this.getMenu} />
        <hr />
        <MenuTiles 
          selectedCategory={selectedCategory}
          menu={menu} />
      </div>
    )
  }
}
