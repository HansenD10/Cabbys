import React, { SFC } from "react";
import { Element } from "react-scroll";
import { transformImage } from "../services/image-service";
import LazyLoad from 'react-lazyload';

import "../styles/_events.scss"
import SocialMedia from "./socialmedia";
import { EventList, SocialMediaLink } from "../models/KenticoModels";

interface EventsProps {
  events: EventList,
  links: SocialMediaLink[]
}

let renderEvents = (eventList: EventList, links: SocialMediaLink[]) => {
  return eventList.events.length > 0 ?
    (
      eventList.events.map(event => {
        return (
          <div key={event.headline} className="event-card">
            <div className="header-image">
              <picture>
                <source media="(min-width: 768px)" srcSet={transformImage(event.headerImage.url, 550, 300)} />
                <source media="(max-width: 767px)" srcSet={transformImage(event.headerImage.url, 733, 300)} />
                <img src={event.headerImage.url} alt={event.headline} />
              </picture>
            </div>
            <div className="card-details">
              <h3>{event.headline}</h3>
              <h4>{event.date}</h4>
              <span dangerouslySetInnerHTML={{ __html: event.description }}></span>
            </div>
          </div>
        )
      })
    ) :
    (
      <div className="error-wrapper">
        <p className="error" dangerouslySetInnerHTML={{ __html: eventList.missingEventMessage }}></p>
        <div className="social-media-wrapper-events">
          <SocialMedia links={links} />
        </div>
      </div>
    )
}

const Events: SFC<EventsProps> = ({ events, links }) => {
  return (
    <Element name="#events" className="events-wrapper">
      <LazyLoad height={600} offset={100}>
        <div className="events-list">
          {renderEvents(events, links)}
        </div>
      </LazyLoad>
    </Element>
  )
}

export default Events