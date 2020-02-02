import React from "react"
import { Element } from "react-scroll"

import GoogleMapComponent from "./google-maps"

import "../styles/_about.scss"

const About = ({ about }) => {
  return (
    <Element name="#about" className="about-wrapper p-0">
      <GoogleMapComponent 
        id="jsMap"
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDboRjmNpFJYKaOqUjI9zELBkIXAYYTiGQ&v=3.exp&libraries=geometry,drawing,places"
        mapElement={<div style={{ height: `100%` }} />}
        containerElement={<div id="jsMap" />}
        loadingElement={<div style={{ height: `100%` }} />}
      ></GoogleMapComponent>
      <div className="about-container">
        <span dangerouslySetInnerHTML={{__html: about.bio}}></span>
        <div className="social-media-wrapper">
          <a 
            aria-label="Cabby's Grill and Patio Facebook link" 
            href="https://www.facebook.com/CabbysGrillandPatio">
            <div className="icon facebook"></div>
          </a>
          <a 
            aria-label="Cabby's Grill and Patio Instagram link"
            href="https://instagram.com/CabbysGrillandPatio">
            <div className="icon instagram"></div>
          </a>
          <a 
            aria-label="Cabby's Grill and Patio Twitter link"
            href="https://twitter.com/CabbysGrillandPatio">
            <div className="icon twitter"></div>
          </a>
        </div>
      </div>
    </Element>
  )
}

export default About;