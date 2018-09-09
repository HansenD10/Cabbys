import React, { Component } from 'react'
import Event from './Event'

export default class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEvent: '',
      selectionMade: false
    }
  }

  selectEvent = (id) => {
    this.setState({ selectedEvent: id, selectionMade: true })
  }

  deselectEvent = () => {
    this.setState({ selectedEvent: '', selectionMade: false })
  }

  checkSelected = (id) => {
    if (id === this.state.selectedEvent) {
      return true;
    }
    return false;
  }


  render() {
    let { events } = this.props
    let { selectionMade } = this.state

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
                  selectionMade={selectionMade}
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
