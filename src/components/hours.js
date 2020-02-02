import React from "react"

import "../styles/_hours.scss"

let width = window.innerWidth;

let days = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat'
}

const Hours = ({ hours }) => (
  <div id="hours" className="hours-container">
    <div className="row justify-content-around">
      {hours.map(day => {
        return (
          (width > 767 || day.isClosed !== 'Yes') && (
            <div key={day.day} className="hours-content">
            <h4>{width > 767 ? day.day : days[day.day]}</h4>
            <div className="divider" />
            <div className="hours">
              { day.isClosed === "Yes"
                  ? ( width > 767 && <p>Closed</p> )
                  : (
                      <React.Fragment>
                        <p>{day.openTime}</p><hr /><p>{day.closeTime}</p>
                      </React.Fragment>
                  )
              }
            </div>
            <div className="bottom" />
          </div>
          )
        )
      })}
    </div>
  </div>
)

export default Hours