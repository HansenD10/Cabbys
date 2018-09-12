import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    let { event, selectEvent, deselectEvent, selected } = this.props
    let eventDate = new Date(event.date)
    let eventDay = eventDate.toLocaleDateString("dd", { day: "2-digit" })
    let eventMonth = eventDate.toLocaleDateString("mmm", { month: "short" })
    let eventStart = eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

    return (
      <div className="event-wrapper">
        <div className="event-date">
          <p>{eventDay}</p>
          <p>{eventMonth}.</p>
        </div>
        <div className="event-info">
          <div className="event-info-header">
            <h3 className="event-name-time">{event.name} at {eventStart}</h3>
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
