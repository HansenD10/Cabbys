import React, { Component } from 'react'
import '../../Styles/Home.css'
import HomeInfo from './HomeInfo';

export default class Home extends Component {
  render() {
    let location = "https://www.google.com/maps/place/N10351+Howard+Dr,+Fox+Lake,+WI+53933/@43.5691369,-88.9461136,17z/data=!3m1!4b1!4m5!3m4!1s0x8806bb4c605fa0eb:0x77afcc8d9f8ef8b4!8m2!3d43.569133!4d-88.9439249"
    let { hours } = this.props
    
    return (
      <div className="home-wrapper wrapper">
        <div className="home-box">
          <div className="home-logo"></div>
          <HomeInfo hours={hours}/>
        </div>
        <a href={location}>
          <div className="location-icon"></div>
        </a>
        <a href="tel:1-920-928-3338">
          <div className="phone-icon"></div>
        </a>
      </div>
    )
  }
}
