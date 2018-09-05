import React, { Component } from 'react'
import { Card, CardHeader, CardContent } from '@material-ui/core'

export default class MenuTiles extends Component {

  render() {
    let { selectedCategory, menu } = this.props
    let selectedMenu = menu.filter(cat => cat.category === selectedCategory)
    console.log(selectedMenu)
      if (selectedCategory === "") {
      return (
        <div>
          <h1 style={{color: "#E0E0E0"}}>Please Select a Category Above</h1>
        </div>
      )
    }
    return (
      <div className="menu-info-wrapper">
        <Card className="tile-info" raised>
          <CardHeader title="Add New Menu Item" />
          <CardContent><i className="material-icons add-icon">add</i></CardContent>
        </Card>
        {selectedMenu.length > 0 && selectedMenu.items.map(item => {
          return (
            <Card className="tile-info" raised>
              <CardHeader title={`${item.name}`} />
              <CardHeader title={`${item.price}`} />
              <CardContent>lorem  ipsum lorem ipsum lorem  ipsum lorem ipsum lorem  ipsum lorem ipsum</CardContent>
              <CardContent><i className="material-icons remove-icon">remove</i></CardContent>
            </Card>
          )
        })}
      </div>
    )
  }
}
