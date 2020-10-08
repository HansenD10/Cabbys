import React, { Component } from 'react';
import { Element } from 'react-scroll';

import '../styles/_menu.scss';
import { MenuCategory } from '../models/kentico/menu_category';
import { MenuItem } from '../models/kentico/menu_item';

interface MenuProps {
  menu: MenuCategory[];
}

interface MenuState {
  isActive: string;
}

export default class Menu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      isActive: props.menu[0].categoryName.value || ''
    };
  }

  shouldComponentUpdate(nextProps: MenuProps, nextState: MenuState): boolean {
    return (
      !(JSON.stringify(nextProps) === JSON.stringify(this.props)) ||
      nextState.isActive !== this.state.isActive
    );
  }

  handleCategoryClick(category: string): void {
    this.setState({ isActive: category });
  }

  render(): React.ReactNode {
    const { menu } = this.props;
    const { isActive } = this.state;

    return (
      <Element name="#menu" className="menu-container container">
        <div className="row">
          <div className="col-md-4 menu-sidebar">
            <h2>Categories</h2>
            {menu.map(
              (category: MenuCategory): React.ReactNode => {
                return (
                  <h4
                    key={category.categoryName.value}
                    className={
                      isActive === category.categoryName.value
                        ? 'active-category'
                        : ''
                    }
                    onClick={(): void =>
                      this.handleCategoryClick(category.categoryName.value)
                    }
                  >
                    {category.categoryName.value}
                  </h4>
                );
              }
            )}
          </div>
          <div className="col-md-8 menu-display-wrapper">
            {menu.map(
              (category: MenuCategory): React.ReactNode => {
                return (
                  <div
                    key={category.categoryName.value}
                    className={
                      'menu-list ' +
                      (isActive === category.categoryName.value
                        ? 'active-list'
                        : '')
                    }
                  >
                    {category.menuItems.value.map(
                      (item: MenuItem): React.ReactNode => {
                        return (
                          <div className="menu-item" key={item.name.value}>
                            <div className="row menu-header">
                              <h4 className="item-name col p-0">
                                {item.name.value}
                              </h4>
                              <h4 className="item-price col-auto p-0">
                                {item.price.value}
                              </h4>
                            </div>
                            {item.description.value !== '<p><br></p>' && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.description.value
                                }}
                              />
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Element>
    );
  }
}
