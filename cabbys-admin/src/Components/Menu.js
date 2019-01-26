import React, { Component } from 'react';
import { Layout, Divider, message } from 'antd';
import axios from 'axios';
import update from 'react-addons-update';
import CtrlBtnGroup from './CtrlBtnGroup';
import MenuCategories from './MenuCategories';
import MenuItem from './MenuItem';

export default class Menu extends Component {
  constructor(props) {
    super(props)
    const foods = [...props.foods]
    this.state = {
      foods,
      categories: foods.map(food => food.category),
      selectedCat: foods[0].category,
      changed: false
    };
    
    this.selectCategory = this.selectCategory.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
  }  

  categoryChange(newCat, remove = false) {
    const foods = [...this.state.foods]

    if(!remove) {
      let menuCatLength = foods.length;
      
      this.setState({
        ...this.state,
        foods: [...foods, { _id:menuCatLength + 1, category: newCat, items: [] }], 
        changed: true
      })
    }
    else {
      let newFoods = foods.filter(food => food.category !== newCat)
      console.log(newFoods)
      this.setState({
        selectedCat: newFoods[0].category,
        categories: newFoods.map(food => food.category),
        foods: newFoods,
        changed: true
      })
    }
    console.log(this.state)
  }
  
  itemChange(newItem, cat, remove = false) {
    const foods = [...this.state.foods]

    if(!remove) {
      newItem.price = `$${newItem.price}`
      let newFoods = foods.map(food => {
        if(food.category === cat) {
          let newFood = Object.assign({}, food)
          newFood.items = update(food.items, { 
            $push: [{
              _id: foods.length + 1,
              name: newItem.name,
              price: newItem.price,
              description: newItem.description
            }]
          })
          return newFood
        }
        return food
      })
    
      this.setState({
        ...this.state,
        foods: newFoods,
        changed: true
      })
    }
    else {
      this.setState({
        ...this.state,
        foods: foods.map(food => {
          if(food.category === cat) {
            return {
              ...food,
              items: food.items.filter(item => {
                return item.name !== newItem.name ? item : undefined
              })
            }
          }
          return food
        }),
        changed: true
      })
    }
  }

  selectCategory(cat) {
    this.setState({ selectedCat: cat });
  }

  reset() { 
    let foods = [...this.props.menu.foods]
    this.setState({ foods, changed: false, selectedCat: foods[0].category });
  }

  update() {
    let foods = this.state.foods.map((cat) => {
      return {
        category: cat.category,
        items: cat.items.map((item) => {
          return {
            name: item.name,
            price: item.price,
            description: item.description
          }
        })
      }
    })
    axios.post(
      '../api/menu', 
      { foods }, 
      { headers: { 
        Authorization: 'Bearer ' + localStorage.getItem('id_token')}
      }
    )
    .then(() => {
      this.setState({ changed: false })
      this.props.updateData()
      message.success('Menu Successfully Updated!')
    })
    .catch(e => {
      message.warning("Unable to Update. Log out and try again.")
    })
  }

  render() {
    const { foods, selectedCat } = this.state

    return (
      <Layout 
        style={{ background: '#fff', overflowY: 'scroll' }}>
        <CtrlBtnGroup 
          reset={this.reset} 
          update={this.update} 
          isHidden={this.state.changed}
          header='Menu' />
        <Divider style={{marginTop: '0'}} />
        <MenuCategories 
          selectCategory={this.selectCategory} 
          selectedCat={selectedCat} 
          foods={foods} 
          categoryChange={this.categoryChange} 
        />
        <Divider />
        <MenuItem
          foods={foods && foods.find(food => food.category === selectedCat)}
          itemChange={this.itemChange}
          categoryChange={this.categoryChange} 
        />
      </Layout>
    );
  }
}
