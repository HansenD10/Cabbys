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
  }



  componentWillMount() {
    if (this.props.time)
      this.isClosed(this.props.time)
  }

  isClosed = (time) => {
    if (time === 'Closed') {
      this.setState({ isClosed: true })
    }
    else {
      this.setState({
        hours: time
      })
    }
  }

  startOnChange = (time) => {
    let { hours } = this.state
    let newHours = time + ' - ' + hours.split(' - ')[1]
    console.log(this.props.day)
    this.props.changedDay(this.props.day, newHours)
    this.setState({
      hours: newHours
    })
  }

  endOnChange = (time) => {
    let { hours } = this.state
    let newHours = hours.split(' - ')[0] + ' - ' + time
    console.log(this.props.day)
    this.props.changedDay(this.props.day, newHours)
    this.setState({
      hours: newHours
    })
  }

  onClosedClick = (day) => {
    this.props.changedDay(this.props.day, '4:00 PM - 10:00 PM')
    this.setState({
      isClosed: false,
      hours: '4:00 PM - 10:00 PM'
    })
  }

  onCloseClick = (day) => {
    this.props.changedDay(this.props.day, 'Closed')
    this.setState({
      isClosed: true,
      hours: null
    })
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
              onChange={this.startOnChange}
            />
            <p>to</p>
            <TimePickerContainer
              id='appointment-time-auto'
              value={end}
              onChange={this.endOnChange}
            />
            <p
              onClick={this.onCloseClick}
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
