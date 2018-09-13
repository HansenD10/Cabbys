import React, { Component } from 'react'

export default class MenuContent extends Component {
  render() {
    let { list } = this.props
    return (
      <div className="menu-content-wrapper">
        <div className="menu-content-header">
          <h3>{list.category ? list.category : 'Drinks'}</h3>
          <hr className="divider"/>
        </div>
        <div className="menu-items-list">
          {list.items ? list.items.map((item) => {
            return (
              <div key={item._id} className="menu-content-items">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h4>{item.price}</h4>
              </div>
            )}
          ) : list.map((item) => {
            return (
              <div key={item._id} className="menu-content-items">
                <h3>{item.category}</h3>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
