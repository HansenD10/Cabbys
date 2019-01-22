import React, { Component } from 'react'

export default class MenuContent extends Component {
  render() {
    let { list } = this.props
    return (
      <div className="menu-content-wrapper">
        <div className="menu-content-header">
          <h3>{list.category}</h3>
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
          ) : list.map((cat) => {
            return (
              <div key={cat._id} className="menu-content-items">
                <h3>{cat.category}</h3>
                {cat.items.map((item) => {
                  return (
                    <div>
                      <p className="drink-name">{item.name}</p>
                      <p>{item.description}</p>
                      <p className="drink-price">{item.price}</p>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
