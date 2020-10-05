import React from 'react';
import moment from 'moment';

import '../styles/_hours.scss';
import { Hours } from '../models/kentico/hours';

const width = window.innerWidth;

interface HoursProps {
  hours: Hours[];
}

export default class HoursComponent extends React.Component<HoursProps, {}> {
  shouldComponentUpdate(nextProps: HoursProps, nextState: {}): boolean {
    return !(JSON.stringify(nextProps) === JSON.stringify(this.props));
  }

  render(): React.ReactNode {
    return (
      <div id="hours" className="hours-container">
        <div className="row justify-content-around">
          {this.props.hours.map(
            (day: Hours): React.ReactNode => {
              return (
                (width > 767 || day.isClosed.value[0].name === 'No') && (
                  <div key={day.day.value} className="hours-content">
                    <h4>
                      {width > 767
                        ? day.day.value
                        : moment()
                            .day(day.day.value)
                            .format('ddd')}
                    </h4>
                    <div className="divider" />
                    <div className="hours">
                      {day.isClosed.value[0].name === 'Yes' ? (
                        <p>Closed</p>
                      ) : (
                        <React.Fragment>
                          <p>{day.openTime.value}</p>
                          <hr />
                          <p>{day.closeTime.value}</p>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="bottom" />
                  </div>
                )
              );
            }
          )}
        </div>
      </div>
    );
  }
}
