import React, { Component } from 'react'
import Event from './Event'

export default class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEvent: ''
    }
  }

  selectEvent = (id) => {
    this.setState({ selectedEvent: id })
  }

  deselectEvent = () => {
    this.setState({ selectedEvent: '' })
  }

  checkSelected = (id) => {
    if (id === this.state.selectedEvent) {
      return true;
    }
    return false;
  }


  render() {
    let { events } = this.props

    return (
      <div className="event-list-wrapper page-block">
        <div className="event-list-header">
          <h1>Upcoming Events</h1>
          <hr />
        </div>
        <div className="events-list">
          {events.length ? events.map((event, i) => {
            while (i < 3) {
              return (
                <Event
                  selectEvent={this.selectEvent.bind(this, event._id)}
                  deselectEvent={this.deselectEvent}
                  event={event}
                  selected={this.checkSelected(event._id)}
                  key={event._id} />
              )
            }
            return null
          }) :
          <h1 className="no-events">No Upcoming Events</h1>
        }
        </div>
      </div>
    )
  }
}
