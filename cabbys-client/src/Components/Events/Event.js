import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    let { event, selectEvent, deselectEvent, selected, selectionMade } = this.props
    let eventDate = new Date(event.date)

    return (
      <div className={`event-wrapper ${!selected && selectionMade ? 'hide' : 'show'} `}>
        <div className="event-date">
          <p>{eventDate.toLocaleDateString("dd", { day: "2-digit" })}</p>
          <p>{eventDate.toLocaleDateString("mmm", { month: "short" })}.</p>
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
