import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    let { event, selectEvent, deselectEvent, selected } = this.props
    console.log(event.date)
    let eventDate = new Date(event.date).toDateString()
    let eventDay = event.date.slice(8,10)
    let eventMonth = eventDate.slice(4,7)

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
    )
  }
}
