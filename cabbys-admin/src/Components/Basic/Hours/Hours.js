import React, { Component } from 'react'
import '../../../Styles/Hours.css'
import Day from './Day';
import axios from 'axios'

export default class Hours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChanged: false,
      days: {}
    }
  }

  componentWillMount() {
    let days = {}
    for(let key in this.props.hours) {
      days[key] = this.props.hours[key].split(' - ')
    }
    this.setState({days})
  }

  changedDay = (day, hours) => {
    let { days } = this.state
    let newDays = days
      newDays[day] = hours
      this.setState({ 
        isChanged: true,
        days: newDays
      })
  }

  updateHours = () => {
    let { days } = this.state
    let newHours = {}
    for(let day in days) {
      newHours[day] = days[day].join(' - ')
    }
    axios.put('./api/hours', {
      hours: newHours
    })
    this.setState({isChanged: false})
  }
  
  render() {
    let { isChanged, days } = this.state

    return (
      <div className="hours-wrapper">
        <div className="hours-header">
          <h3>Hours</h3>
          {isChanged ? (
          <div className="hours-btn-group">
            <p 
              className="update-btn"
              onClick={this.updateHours}>Update</p>
            <p
              className="reset-btn">Reset</p>
          </div>
          ) : (
            null
          )}
        </div>
        <div className="hours-form">
          {days && Object.keys(days).map((day) => {
            return (
              <Day 
                key={day} 
                hoursObj={days[day]} 
                changedDay={this.changedDay} 
                day={day}/>
            )
          })
          }
        </div>
      </div>
    )
  }
}
