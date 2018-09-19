import React, { Component } from 'react'
import '../../../Styles/Hours.css'
import Day from './Day';
import axios from 'axios'
import Header from '../../Admin/Header';
import SnackbarContainer from 'react-md/lib/Snackbars'

export default class Hours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChanged: false,
      days: [],
      toasts: []
    }
  }

  componentWillMount() {
    let { hours } = this.props
    let tempDays = []
    for (let i in hours) {
      tempDays.push({
        dow: i,
        time: hours[i]
      })
    }
    this.setState({ days: tempDays })
  }

  changedDay = (day, hours) => {
    let { days } = this.state
    let tempDays = days
    for(let i in days) {
      if(tempDays[i].dow === day)
        tempDays[i] = {dow: day, time: hours} 
    }
    this.setState({
      isChanged: true,
      days: tempDays
    })
  }

  update = () => {
    let { days } = this.state
    let newHours = {}
    days.map((day) => {
      newHours[day.dow] = day.time
    })
    axios.put('./api/hours', {
      hours: newHours
    })
    const toasts = this.state.toasts.slice()
    toasts.push({text: 'Successfully Updated'})
    this.setState({ isChanged: false, toasts })
  }

  reset = () => {
    let { hours } = this.props
    let tempDays = []
    for (let i in hours) {
      tempDays.push({
        dow: i,
        time: hours[i]
      })
    }
    console.log(this.state.days)
    console.log(tempDays)
    this.setState({ days: tempDays, isChanged: false })
  }

  render() {
    let { hours } = this.props
    let { isChanged, days, toasts } = this.state

    return (
      <div className="hours-wrapper">
        <SnackbarContainer 
          style={{textAlign: 'center'}}
          id="snackbar"
          toasts={toasts}
          autohide={true} 
          onDismiss={() => this.setState({toasts: []})} />
        <Header title="Hours" isChanged={isChanged} reset={this.reset} update={this.update} />
        <div className="hours-form">
          {days && days.map((day) => {
            return (
              <Day
                key={day.dow}
                day={day.dow}
                time={day.time}
                changedDay={this.changedDay} />
            )
          })
          }
        </div>
      </div>
    )
  }
}
