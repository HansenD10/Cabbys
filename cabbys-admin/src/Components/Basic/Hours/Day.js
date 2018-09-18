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
    if(this.props.time) 
      this.isClosed(this.props.time)
  }

  isClosed = (time) => {
    if (time === 'Closed') {
      this.setState({isClosed: true})
    }
    else {
      let splitTime = time.split(' - ')
      this.setState({
        hours: {
          start: splitTime[0],
          end: splitTime[1]
        }
      })
    }
  }

  startOnChange = (time, day) => {
    let { end } = this.state.hours
    console.log(time)
    this.setState({
      hours: {
        ...this.state.hours,
        start: time
      }
    })
    this.props.changedDay(this.props.day, `${time} - ${end}` )
  }
  
  endOnChange = (time, day) => {
    let { start } = this.state.hours
    console.log(time)
    this.setState({
      hours: {
        ...this.state.hours,
        end: time
      }
    })
    this.props.changedDay(this.props.day, `${start} - ${time}`)
  }

  onClosedClick = (day) => {
    this.setState({
      isClosed: false,
      hours: {
        start:'4:00 PM',
        end: '10:00 PM'
      }
    })

    this.props.changedDay(this.props.day, '4:00 PM - 10:00 PM')
  }
  
  onCloseClick = (day) => {
    this.setState({
      isClosed: true,
      hours: {
        start: null,
        end: null
      }
    })
    console.log(this.props.day)
    this.props.changedDay(this.props.day, 'Closed')
  }

  render() {
    let { day, time } = this.props
    let { isClosed } = this.state
    let hours = time.split(' - ')
    let start = new Date(moment(hours[0], 'h:mm A'))
    let end = new Date(moment(hours[1], 'h:mm A'))

    return(
      <div key={day} className="form-group">
        <h4 className="day">{day}</h4>
        {!isClosed ? (
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
        ) : ( 
          <div className="pickers-wrapper">
            <h4 
              onClick={this.onClosedClick} 
              className="closed-btn">Closed</h4>
          </div>
        )}
      </div>
    )
  }
}
