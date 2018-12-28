import React, { Component } from 'react';
import { Layout, Divider, Col, Card, Icon, Button, message, Row } from 'antd';
import axios from 'axios';
import CtrlBtnGroup from './CtrlBtnGroup';
import NewEvent from './NewEvent';

const Content = Layout.Content;

export default class Events extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newEventVisible: false,
			changed: false
		};

		this.newEvent = this.newEvent.bind(this);
	}

	newEvent(data) {
		axios.post(
			'../api/events',
			data,
			{
				headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') }
			})
			.then(() => {
				message.success('Successfully Added Event');
				this.setState({ newEventVisible: false });
				this.props.updateData();
			})
			.catch(() => message.error('Error Creating New Event.'));
	}

	removeItem(id) {
		axios.delete(
			'../api/events',
			{
				headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
				data: { id }
			})
			.then(() => {
				message.success('Successfully Removed Event');
				this.props.updateData();
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { newEventVisible } = this.state;
		const { events } = this.props;

		return (
			<Content
				style={{ background: '#fff', overflowY: 'scroll' }}>
				<CtrlBtnGroup
					isHidden={false}
					header="Events" />
				<Divider style={{ marginTop: '0' }} />
				<Row type='flex'>
					{events && events.map(event => {
						return (
							<Col
								key={event._id}
								style={{ padding: '10px' }}
								span={12}>
								<Card
									style={{ height: '300px', display: 'flex', flexDirection: 'column' }}
									title={`${event.name}`}
									actions={[<Icon type='close' onClick={() => this.removeItem(event._id)} />]}
									bodyStyle={{ flexGrow: '1' }}>
									<p>{event.time} on {new Date(event.date).toLocaleDateString()}</p>
									<p>{event.description}</p>
								</Card>
							</Col>
						)
					}
					)}
					<Col
						style={{ padding: '10px' }}
						span={12}>
						<Card
							style={{
								height: '300px',
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center'
							}}
							bodyStyle={{ flexGrow: '1' }}>
							<Row type='flex'>
								<Button
									icon="plus"
									type="primary"
									size="large"
									style={{ margin: 'auto' }}
									onClick={(() => this.setState({ newEventVisible: true }))}
								>Add New Event</Button>
							</Row>
						</Card>
					</Col>
					<NewEvent
						handleOk={this.newEvent}
						handleCancel={() => this.setState({ newEventVisible: false })}
						visible={newEventVisible} />
				</Row>
			</Content>
		)
	}
}
