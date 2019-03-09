import React, { Component } from 'react';
import { Modal, Form, Input, TimePicker, DatePicker, message } from 'antd';
import moment from 'moment';

export default class NewEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				name: '',
				date: new Date(),
				time: '4:00 PM',
				description: ''
			}
		};

		this.emptyForm = Object.assign({}, this.state.form);
	}


	render() {
		const { name, time, date, description } = this.state.form;
		const { visible, handleCancel, handleOk } = this.props;

		return (
			<Modal title='New Item'
				visible={visible}
				onOk={() => {
					let { name, time, date, description } = this.state.form
					if (name && time && date && description) {
						this.setState({ form: this.emptyForm })
						handleOk(...arguments, this.state.form)
					}
					else {
						message.error('Please Fill out all the info.')
					}
				}}
				onCancel={handleCancel}>
				<Form>
					<Form.Item
						wrapperCol={{ span: 21 }}
						labelCol={{ span: 3 }}
						label='Name'>
						<Input
							required
							onChange={(e) => this.setState({
								form: {
									...this.state.form,
									name: e.target.value
								}
							})}
							value={name}
							name='name' />
					</Form.Item>
					<Form.Item
						wrapperCol={{ span: 21 }}
						labelCol={{ span: 3 }}
						label='Time'>
						<TimePicker
							value={moment(time, 'h:mm A')}
							format="h:mm A"
							onChange={(e, s) => {
								this.setState({
									form: {
										...this.state.form,
										time: s
									}
								})
							}}
							minuteStep={15}
							use12Hours={true} />
					</Form.Item>
					<Form.Item
						wrapperCol={{ span: 21 }}
						labelCol={{ span: 3 }}
						label='Date'>
						<DatePicker
							value={moment(date, 'MM/DD/YYYY')}
							format='MM/DD/YYYY'
							onChange={(e) => this.setState({
								form: {
									...this.state.form,
									date: e._d
								}
							})}></DatePicker>
					</Form.Item>
					<Form.Item
						label='Description'>
						<Input.TextArea
							style={{ height: '100px' }}
							value={description}
							onChange={(e) => this.setState({
								form: {
									...this.state.form,
									description: e.target.value
								}
							})}>
						</Input.TextArea>
					</Form.Item>
				</Form>
			</Modal>
		)
	}
}
