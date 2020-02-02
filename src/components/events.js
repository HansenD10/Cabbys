import React from "react"
import { Element } from "react-scroll"
import { transformImage } from "../services/image-service"

import "../styles/_events.scss"

const Events = ({ events }) => {
  return(
    <Element name="#events" className="events-wrapper">
        <div className="events-list">
          {events.events.map(event => {
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
          })}
        </div>
    </Element>
  )
}

export default Events