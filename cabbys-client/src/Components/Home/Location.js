import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react/lib';
import Marker from './Marker';

export default class Location extends Component {
  render() {
    const api = "AIzaSyDboRjmNpFJYKaOqUjI9zELBkIXAYYTiGQ";

    return (
      <div className="location-wrapper">
        <hr />
        <h3 className="home-header">Location</h3>
        <hr />
        <div className="location-content">
          <p>N10351 Howard Dr, Fox Lake, WI 53933</p>
          <div style={{ height: "180px", width: "90%", margin: "0 auto" }}>
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
    );
  }
}
