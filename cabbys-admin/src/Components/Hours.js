import React, { Component } from 'react'
import { Layout, Divider, Col, Row, TimePicker, Button, message } from 'antd'
import CtrlBtnGroup from './CtrlBtnGroup'
import moment from 'moment'
import axios from 'axios'

export default class Hours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: props.hours,
      changed: false
    };

    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  close(key) {
    let hours = Object.assign({}, this.state.hours);
    hours[key] = 'Closed';
    this.setState({ hours, changed: true });
  }

  open(key) {
    let hours = Object.assign({}, this.state.hours);
    hours[key] = '4:00 PM - 12:00 AM';
    this.setState({ hours, changed: true });
  }

  reset() {
    this.setState({ hours: this.props.hours, changed: false });
  }

  update() {
    const { hours } = this.state;

    axios.put(
      '../api/hours',
      { hours: hours },
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } })
      .then(() => {
        this.setState({ changed: false });
        message.success('Hours Successfully Updated!');
      })
      .catch(() => {
        message.warning("Unable to Update. Log out and try again.");
      }
      );
  }

  onChange(key, i, e) {
    let hours = Object.assign({}, this.state.hours);
    if (i === 'start') {
      hours[key] = `${moment(e._d).format('hh:mm A')} - ${hours[key].split(' - ')[1]}`;
      this.setState({ hours, changed: true });
    }
    else {
      hours[key] = `${hours[key].split(' - ')[0]} - ${moment(e._d).format('hh:mm A')}}`;
      this.setState({ hours, changed: true });
    }
  }

  render() {
    const { hours } = this.state;

    return (
      <Layout
        style={{ backgroundColor: '#fff' }}>
        <CtrlBtnGroup
          reset={this.reset}
          update={this.update}
          isHidden={this.state.changed}
          header="Hours" />
        <Divider
          style={{ marginTop: '0' }} />
        <Row
          style={{ display: 'flex', justifyContent: 'space-around' }}>
          {Object.keys(hours).map((hour) => {
            if (hours[hour] === 'Closed') {
              return (
                <Col
                  key={hour}
                  span="3"
                  style={{ margin: 'auto 0', textAlign: 'center' }}>
                  <Button
                    onClick={this.open.bind(this, hour)}
                  >Closed</Button>
                </Col>
              )
            }
            let start = hours[hour].split(' - ')[0]
            let end = hours[hour].split(' - ')[1]
            return (
              <Col
                key={hour}
                span="3"
                style={{ textAlign: 'center', margin: 'auto 0' }}>
                <Row>
                  <h3>{hour}</h3>
                </Row>
                <Divider />
                <Row>
                  <TimePicker
                    onChange={this.onChange.bind(this, hour, 'start')}
                    value={moment(start, 'H:mm A')}
                    format="h:mm A"
                    minuteStep={15}
                    use12Hours={true} />
                </Row>
                <Row>
                  To
                </Row>
                <Row>
                  <TimePicker
                    onChange={this.onChange.bind(this, hour, 'end')}
                    value={moment(end, 'H:mm A')}
                    format="h:mm A"
                    minuteStep={15}
                    use12Hours={true} />
                </Row>
                <Divider />
                <Row>
                  <Button
                    onClick={this.close.bind(this, hour)}>Closed</Button>
                </Row>
              </Col>
            )
          })}
        </Row>
      </Layout>
    )
  }
}
