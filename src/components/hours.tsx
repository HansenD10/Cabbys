import React from 'react';
import moment from 'moment';

import '../styles/_hours.scss';
import { Hour } from '../models/KenticoModels';

const width = window.innerWidth;

interface HoursProps {
  hours: Hour[]
}

export default class Hours extends React.Component<HoursProps, {}> {
  shouldComponentUpdate(nextProps: HoursProps, nextState: {}): boolean {
    return !(JSON.stringify(nextProps) === JSON.stringify(this.props))
  }

  render(): React.ReactNode {
    return (
      <div id="hours" className="hours-container">
        <div className="row justify-content-around">
          {this.props.hours.map(day => {
            return (
              (width > 767 || day.isClosed) && (
                <div key={day.day} className="hours-content">
                  <h4>{width > 767 ? day.day : moment().day(day.day).format('ddd')}</h4>
                  <div className="divider" />
                  <div className="hours">
                    {!day.isClosed
                      ? <p>Closed</p>
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
  }
}