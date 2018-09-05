import React, { Component } from 'react'
import axios from 'axios'
import { Chip } from '@material-ui/core'


export default class MenuCategories extends Component {

  deleteCategory = (id) => {
    axios.delete("http://localhost:8080/menu", {
      data: { id }
    }).then(result => {
      console.log(result.data.message)
      this.props.getMenu()
    })
  }

  render() {
    let { menu, isNewCategory, showCategoryInput } = this.props
    return (
      <div className="categories-wrapper">
        Categories:
        {menu.map(item => {
          return (
            <Chip
              className="spacer"
              key={item._id}
              label={item.category}
              onDelete={this.deleteCategory.bind(this, item._id)}
              onClick={this.props.selectCategory.bind(this, item.category)}
              clickable />
          )
        })}
        {menu.length < 12 &&
          <Chip
            key="AddNewChip"
            className="spacer"
            label="Add New Category"
            onClick={showCategoryInput}
            onDelete={showCategoryInput}
            clickable
            deleteIcon={isNewCategory ?
              <i className="material-icons">remove</i> :
              <i className="material-icons">add</i>} />}
      </div>

    )
  }
}
