import React, { Component } from 'react';

export default class Event extends Component {
  render() {
    const { event, selectEvent, deselectEvent, selected } = this.props;
    const eventDate = new Date(event.date).toDateString();
    const eventDay = event.date.slice(8, 10);
    const eventMonth = eventDate.slice(4, 7);

    return (
      <div className="event-wrapper">
        <div className="event-date">
          <p>{eventDay}</p>
          <p>{eventMonth}.</p>
        </div>
        <div className="event-info">
          <div className="event-info-header">
            <h3 className="event-name-time">{event.name} at {event.time}</h3>
          </div>
          <hr />
          {selected ?
            <p onClick={deselectEvent} className="read-more">Read less &#x25B2;</p> :
            <p onClick={selectEvent} className="read-more">Read More &#x25BC;</p>
          }
          <div className={`event-desc ${selected ? 'open' : ''}`}>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    );
  }
}
