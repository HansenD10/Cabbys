import React, { Component } from 'react'
import axios from 'axios'
import { Input, InputLabel, Button } from '@material-ui/core'


export default class CategoryInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newCategoryInput: ""
    }
  }

  updateNewCategory = (e) => {
    this.setState({
      newCategoryInput: e.target.value
    })
  }

  addCategory = (e) => {
    e.preventDefault();
    let cat = this.state.newCategoryInput
    if (cat === "") {
      alert("Enter a category")
    }
    axios.post("http://localhost:8080/menu", {
      category: cat
    })
      .catch(err => console.log(err))
      .then(result => {
        this.props.getMenuItems()
      })
    this.setState({
      newCategoryInput: ""
    })
  }

  render() {
    let { isNewCategory, menuLength } = this.props
    return (
      <div className={`category-input ${(isNewCategory && menuLength < 12) ? 'show' : 'hide'}`}>
        <form onSubmit={this.addCategory.bind(this)}>
          <InputLabel>Enter a new Category</InputLabel>
          <Input
            className="spacer"
            required
            value={this.state.newCategoryInput}
            onChange={e => this.updateNewCategory(e)} />
          <Button
            className="spacer"
            type="submit"
            color="primary"
            variant="contained">Add Category</Button>
        </form>
      </div>
    )
  }
}
