import React, { SFC } from "react"
import { Element } from 'react-scroll';
import LazyLoad from 'react-lazyload';

import GoogleMapComponent from "./google-maps"
import SocialMedia from "./socialmedia"

import '../styles/_about.scss';
import { About } from "../models/KenticoModels";

interface AboutProps {
  about: About;
}

const AboutComponent: SFC<AboutProps> = ({ about }: AboutProps) => {
  return (
    <Element name="#about" className="about-wrapper p-0">
      <LazyLoad height={600} offset={100}>
        <a className="map-link" rel="noopener noreferrer" target='_blank' href="https://www.google.com/maps/place/Cabby's+Grill+%26+Patio/@43.5688373,-88.9442057,17z/data=!4m5!3m4!1s0x8806bb25c9e7d967:0xcb0c01429e8c7b77!8m2!3d43.5691314!4d-88.9439248">
          <GoogleMapComponent
            id="jsMap"
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDboRjmNpFJYKaOqUjI9zELBkIXAYYTiGQ&v=3.exp&libraries=geometry,drawing,places"
            mapElement={<div style={{ height: `100%` }} />}
            containerElement={<div id="jsMap" />}
            loadingElement={<div style={{ height: `100%` }} />}
          ></GoogleMapComponent>
        </a>
        <div className="about-container">
          <span dangerouslySetInnerHTML={{ __html: about.bio }}></span>
          <div className="social-media-wrapper">
            {<SocialMedia links={about.socialMediaLinks} />}
          </div>
        </div>
      </LazyLoad>
    </Element>
  );
}

export default AboutComponent;