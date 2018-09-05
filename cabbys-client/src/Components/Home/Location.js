import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'

export default class Location extends Component {
  render() {
    let api = "AIzaSyDboRjmNpFJYKaOqUjI9zELBkIXAYYTiGQ"
    return (
      <div className="location-wrapper">
        <hr />
        <h2 className="location-header">Location</h2>
        <hr />
        <div className="location-content">
          <p>N10351 Howard Dr, Fox Lake, WI 53933</p>
          <div style={{ height: "180px", width: "80%", margin: "0 auto" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: api }}
              zoom={13}
              center={{ lat: 43.5691369, lng: -88.9461136 }}
            >
              <Marker lat={43.5691369} lng={-88.9461136} />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    )
  }
}
