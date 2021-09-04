import React from 'react';
import { Element } from 'react-scroll';
import LazyLoad from 'react-lazyload';

import GoogleMapComponent from './google-maps';
// import SocialMedia from "./socialmedia"

import '../styles/_about.scss';
import { AboutPage } from '../models/kentico/about_page';
import SocialMedia from './socialmedia';

interface AboutProps {
  about: AboutPage;
}

export default class AboutComponent extends React.Component<AboutProps, {}> {
  shouldComponentUpdate(nextProps: AboutProps, nextState: {}): boolean {
    return !(JSON.stringify(nextProps) === JSON.stringify(this.props));
  }

  render(): React.ReactNode {
    const { about } = this.props;
    return (
      <Element name="#about" className="about-wrapper p-0">
        <LazyLoad height={600} offset={100}>
          <div className="row">
            <a
              className="map-link col-sm-12 col-md-6"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.google.com/maps/place/Cabby's+Grill+%26+Patio/@43.5688373,-88.9442057,17z/data=!4m5!3m4!1s0x8806bb25c9e7d967:0xcb0c01429e8c7b77!8m2!3d43.5691314!4d-88.9439248"
            >
              <GoogleMapComponent
                id="jsMap"
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDboRjmNpFJYKaOqUjI9zELBkIXAYYTiGQ&v=3.exp&libraries=geometry,drawing,places"
                mapElement={<div style={{ height: `100%` }} />}
                containerElement={<div id="jsMap" />}
                loadingElement={<div style={{ height: `100%` }} />}
              />
            </a>
            <div className="about-container col-sm-12 col-md-6">
              <span dangerouslySetInnerHTML={{ __html: about.bio.value }} />
              <div className="social-media-wrapper">
                {
                  <SocialMedia
                    links={
                      about.socialMediaLinks ? about.socialMediaLinks.value : []
                    }
                  />
                }
              </div>
            </div>
          </div>
        </LazyLoad>
      </Element>
    );
  }
}
