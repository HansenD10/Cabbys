import React, { Component } from 'react'
import '../../Styles/Loading.css'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-wrapper">
        <div className="bubblingG">
          <span id="bubblingG_1">
          </span>
          <span id="bubblingG_2">
          </span>
          <span id="bubblingG_3">
          </span>
        </div>
      </div>
    )
  }
}
