import React, { Component } from 'react'

export default class MenuContent extends Component {
  render() {
    let { list } = this.props
    return (
      <div className="menu-content-wrapper">
        <div className="menu-content-header">
          <h2>{list.category ? list.category : 'Drinks'}</h2>
          <hr className="divider"/>
        </div>
        <div className="menu-items-list">
          {list.items ? list.items.map((item) => {
            return (
              <div key={item._id} className="menu-content-items">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>{item.price}</p>
              </div>
            )}
          ) : list.map((item) => {
            return (
              <div className="menu-content-items">
                <p>{item.category}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
