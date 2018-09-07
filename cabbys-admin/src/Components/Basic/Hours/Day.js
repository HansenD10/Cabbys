import React, { Component } from 'react'
import { TimePickerContainer } from 'react-md/lib/Pickers'
import moment from 'moment'

export default class Day extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClosed: false,
      hours: {
        start: null,
        end: null
      }
    }
  }

  componentWillMount() {
    this.isClosed(this.props.hoursObj)
  }

  isClosed = (date) => {
    if (date[1] === undefined) {
      this.setState({isClosed: true})
    }
    else {
      this.setState({
        hours: {
          start: new Date(moment(date[0], 'h:mm A')),
          end: new Date(moment(date[1], 'h:mm A'))
        }
      })
    }
  }

  startOnChange = (e) => {
    this.setState({
      hours: {
        ...this.state.hours,
        start: new Date(moment(e, 'h:mm A'))
      }
    })
    this.props.changedDay()
  }
  
  endOnChange = (e) => {
    this.setState({
      hours: {
        ...this.state.hours,
        end: new Date(moment(e, 'h:mm A'))
      }
    })
  }

  onClosedClick = (day) => {
    this.setState({
      isClosed: false,
      hours: {
        start: new Date(moment('4:00 PM', 'h:mm a')),
        end: new Date(moment('10:00 PM', 'h:mm a'))
      }
    })

    this.props.changedDay(day, ['4:00 PM', '10:00 PM'])
  }
  
  onCloseClick = (day) => {
    this.setState({
      isClosed: true,
      hours: {
        start: null,
        end: null
      }
    })

    this.props.changedDay(day, ['Closed'])
  }

  render() {
    let { day } = this.props
    let { isClosed, hours } = this.state

    return(
      <div key={day} className="form-group">
        <h4 className="day">{day}</h4>
        {!isClosed ? (
        <div className="pickers-wrapper">
          <TimePickerContainer 
            id='appointment-time-auto'
            value={hours.start}
            onChange={this.startOnChange.bind(this)}
            />
          <p>to</p>
          <TimePickerContainer 
            id='appointment-time-auto'
            value={hours.end}
            onChange={this.endOnChange.bind(this)}
            />
            <p 
              onClick={this.onCloseClick.bind(this, day)}
              className='closed-btn'>Close</p>
        </div>
        ) : ( 
          <div className="pickers-wrapper">
            <h4 
              onClick={this.onClosedClick.bind(this, day)} 
              className="closed-btn">Closed</h4>
          </div>
        )}
      </div>
    )
  }
}
