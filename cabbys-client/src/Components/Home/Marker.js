import React, { Component } from 'react'

export default class Marker extends Component {
  render() {
    let googleUrl = "https://www.google.com/maps/search/Cabby's+Grill+%26+Patio"
    return (
      <div
        className="marker"
        onClick={() => { window.location = googleUrl }}>
      </div>
    )
  }
}
