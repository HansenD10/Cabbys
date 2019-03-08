import React, { Component } from 'react';
import EventList from './EventList';
import '../../Styles/Events.scss';

export default class Events extends Component {
  render() {
    const { events } = this.props;

    return (
      <div className="events-wrapper wrapper">
        <EventList events={events} />
      </div>
    );
  }
}
