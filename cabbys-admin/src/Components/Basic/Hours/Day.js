import React, { Component } from 'react'
import { TimePickerContainer } from 'react-md/lib/Pickers'
import moment from 'moment'

export default class Day extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClosed: false,
      hours: null
    }

    this.startChange = this.onDateChange.bind(this, 0)
    this.endChange = this.onDateChange.bind(this, 1)
  }

  componentWillReceiveProps(nextProps) {
    nextProps.time && this.isClosed(nextProps.time)
  }

  componentWillMount() {
    this.props.time && this.isClosed(this.props.time)
  }

  isClosed = (hours) => {
    hours === 'Closed' ?
      this.setState({ isClosed: true }) :
      this.setState({ isClosed: false, hours })
  }

  onDateChange = (order, time) => {
    let { hours } = this.state
    let { changedDay, day } = this.props
    let newHours = null
    
    order === 0 ?
      newHours = time + ' - ' + hours.split(' - ')[1] :
      newHours = hours.split(' - ')[0] + ' - ' + time

    changedDay(day, newHours)
    this.setState({ hours: newHours })
  }

  onClosedClick = () => {
    let { isClosed } = this.state
    let { changedDay, day } = this.props
    let newState = isClosed ? 
      { isClosed: false, hours: '4:00 PM - 10:00 PM' } :
      { isClosed: true, hours: 'Closed' }

    this.setState(newState)
    changedDay(day, newState.hours)
  }

  render() {
    let { day, time } = this.props
    let { isClosed } = this.state
    
    if (!isClosed) {
      let hours = time.split(' - ')
      let start = new Date(moment(hours[0], 'h:mm A'))
      let end = new Date(moment(hours[1], 'h:mm A'))

      return (
        <div key={day} className="form-group">
          <h4 className="day">{day}</h4>
          <div className="pickers-wrapper">
            <TimePickerContainer
              id='appointment-time-auto'
              value={start}
              onChange={this.startChange}
            />
            <p>to</p>
            <TimePickerContainer
              id='appointment-time-auto'
              value={end}
              onChange={this.endChange}
            />
            <p
              onClick={this.onClosedClick}
              className='closed-btn'>Close</p>
          </div>
        </div>
      )
    } else {
      return (
        <div key={day} className="form-group">
          <h4 className="day">{day}</h4>
          <div className="pickers-wrapper">
            <h4
              onClick={this.onClosedClick}
              className="closed-btn">Closed</h4>
          </div>
        </div>
      )
    }
  }
}
