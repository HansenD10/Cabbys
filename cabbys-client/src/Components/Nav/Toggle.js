import React, { Component } from 'react'
import '../../Styles/Toggle.scss'

export default class Toggle extends Component {
  render() {
    let { toggle, selectToggle} = this.props
    return (
      <div onClick={selectToggle} className={`toggler ${toggle ? 'open' : ''}`}>
        <div className="hamburger"></div>
      </div>
    )
  }
}
