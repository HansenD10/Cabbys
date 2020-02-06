import React from "react";
import { Element } from "react-scroll";
import { transformImage } from "../services/image-service";
import LazyLoad from 'react-lazyload';

import "../styles/_events.scss"
import SocialMedia from "./socialmedia";

let renderEvents = (eventList, links) => {
  return eventList.events.length > 0 ?
    (
      eventList.events.map(event => {
        return (
          <div key={event.headline} className="event-card">
            <div className="header-image">
              <picture>
                <source media="(min-width: 768px)" srcSet={transformImage(event.headerImage, 550, 300)} />
                <source media="(max-width: 767px)" srcSet={transformImage(event.headerImage, 733, 300)} />
                <img src={event.headerImage} alt={event.headline} />
              </picture>
            </div>
            <div className="card-details">
              <h3>{event.headline}</h3>
              <h4>{event.date}</h4>
              <span dangerouslySetInnerHTML={{__html: event.description}}></span>
            </div>
          </div>
        )
      })
    ) :
    ( 
      <div className="error-wrapper">
        <p className="error" dangerouslySetInnerHTML={{__html: eventList.missingEventMessage}}></p>
        <div className="social-media-wrapper-events">
          <SocialMedia links={links}/>
        </div>
      </div> 
    )
}

const Events = ({ events, links }) => {
  return(
    <LazyLoad offset={100}>
      <Element name="#events" className="events-wrapper">
        <div className="events-list">
          { renderEvents(events, links) }
        </div>
      </Element>
    </LazyLoad>
  )
}

export default Events