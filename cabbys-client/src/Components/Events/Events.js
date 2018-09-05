import React, { Component } from 'react'
import EventList from './EventList'
import '../../Styles/Events.css'

export default class Events extends Component {
  render() {
    let { events } = this.props
    return (
      <div className="events-wrapper wrapper">
        <EventList events={events}/>
      </div>
    )
  }
}
