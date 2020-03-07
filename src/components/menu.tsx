import React, { Component } from "react"
import { Element } from "react-scroll"

import "../styles/_menu.scss"
import { MenuCategory } from "../models/KenticoModels";

interface MenuProps {
  menu: MenuCategory[]
}

interface MenuState {
  isActive: string
}

export default class Menu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      isActive: props.menu[0].category || ""
    }
  }

  handleCategoryClick(category: string): void {
    this.setState({ isActive: category })
  }

  render(): React.ReactNode {
    const { menu } = this.props;
    const { isActive } = this.state;

    return (
      <Element name="#menu" className="menu-container container">
        <div className="row">
          <div className="col-md-4 menu-sidebar">
            <h2>Categories</h2>
            {menu.map(category => {
              return (
                <h4
                  key={category.category}
                  className={isActive === category.category ? 'active-category' : ''}
                  onClick={() => this.handleCategoryClick(category.category)}
                >{category.category}</h4>
              )
            })}
          </div>
          <div className="col-md-8 menu-display-wrapper">
            {menu.map(category => {
              return (
                <div key={category.category} className={'menu-list ' + (isActive === category.category ? 'active-list' : '')}>
                  {category.items.map(item => {
                    return (
                      <div className="menu-item" key={item.name}>
                        <div className="row menu-header">
                          <h4 className="item-name col p-0">{item.name}</h4>
                          <h4 className="item-price col-auto p-0">{item.price}</h4>
                        </div>
                        {item.description !== "<p><br></p>" && <div dangerouslySetInnerHTML={{__html: item.description}}></div>}
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