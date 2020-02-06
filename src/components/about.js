import React from "react"
import { Element } from 'react-scroll';
import LazyLoad from 'react-lazyload';

import GoogleMapComponent from "./google-maps"
import SocialMedia from "./socialmedia"

import '../styles/_about.scss';

const About = ({ about }) => {
  return (
    <LazyLoad offset={100}>
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
            {<SocialMedia links={about.socialMediaLinks} />}
          </div>
        </div>
      </Element>
    </LazyLoad>
  )
}

export default About;