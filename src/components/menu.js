import React, { Component } from "react"
import { Element } from "react-scroll"

import "../styles/_menu.scss"

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: Object.keys(props.menu)[0] || ""
    }
  }

  handleCategoryClick(category) {
    this.setState({ isActive: category })
  }
  
  render() {
    const { menu } = this.props;
    const { isActive } = this.state;
    
    return (
      <Element name="#menu" className="menu-container container">
        <div className="row">
          <div className="col-md-4 menu-sidebar">
            <h2>Categories</h2>
            {Object.keys(menu).map(key => {
              return (
                <h4 
                  key={key} 
                  className={isActive === key ? 'active-category' : ''}
                  onClick={() => this.handleCategoryClick(key)}
                  >{key}</h4>
              )
            })}
          </div> 
          <div className="col-md-8 menu-display-wrapper">
            {Object.keys(menu).map(key => {
              return (
                <div key={key} className={'menu-list ' + (isActive === key ? 'active-list' : '')}>
                  {menu[key].map(item => {
                    return (
                      <div className="menu-item" key={item.name}>
                        <h3>{item.name} | {item.price}</h3>
                        <span dangerouslySetInnerHTML={{__html: item.description}}></span>
                      </div>
                    )
                  })}
                </div>
              )
            })

            }
          </div>
        </div>
      </Element>
    )
  }
}