import React from 'react';
import { Element } from 'react-scroll';
import { transformImage } from '../services/image-service';
import LazyLoad from 'react-lazyload';

import '../styles/_events.scss';
import SocialMedia from './socialmedia';
import { EventList } from '../models/kentico/event_list';
import { SocialMediaLink } from '../models/kentico/social_media_link';
import { Event } from '../models/kentico/event';

interface EventsProps {
  events: EventList;
  links: SocialMediaLink[];
}

export default class Events extends React.Component<EventsProps, {}> {
  shouldComponentUpdate(nextProps: EventsProps, nextState: {}): boolean {
    return !(JSON.stringify(nextProps) === JSON.stringify(this.props));
  }

  renderEvents(
    eventList: EventList,
    links: SocialMediaLink[]
  ): React.ReactNode {
    return eventList.events.value.length > 0 ? (
      eventList.events.value.map(
        (event: Event): React.ReactNode => {
          return (
            <div key={event.headline.value} className="event-card">
              <div className="header-image">
                <picture>
                  <source
                    media="(min-width: 768px)"
                    srcSet={transformImage(
                      event.headerImage.value[0].url,
                      550,
                      300
                    )}
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet={transformImage(event.headerImage[0].url, 733, 300)}
                  />
                  <img
                    src={event.headerImage[0].url}
                    alt={event.headline.value}
                  />
                </picture>
              </div>
              <div className="card-details">
                <h3>{event.headline}</h3>
                <h4>{event.date}</h4>
                <span
                  dangerouslySetInnerHTML={{ __html: event.description.value }}
                />
              </div>
            </div>
          );
        }
      )
    ) : (
      <div className="error-wrapper">
        <p
          className="error"
          dangerouslySetInnerHTML={{
            __html: eventList.missingEventsMessage.value
          }}
        />
        <div className="social-media-wrapper-events">
          <SocialMedia links={links} />
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    const { events, links } = this.props;

    return (
      <Element name="#events" className="events-wrapper">
        <LazyLoad height={600} offset={100}>
          <div className="events-list">
            {events && this.renderEvents(events, links)}
          </div>
        </LazyLoad>
      </Element>
    );
  }
}
