import React, { Component } from 'react';
import api from '../../modules/APIManager';

export default class ResourceEditForm extends Component {
	// Set initial state
	state = {
		userId: '',
		message: ''
	};

	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateMessage = (evt) => {
		evt.preventDefault();

		const editedMessage = {
			id: this.props.match.params.messageId,
			message: this.state.message,
			userId: sessionStorage.getItem('credentials')
		};

		this.props.updateResource(editedMessage).then(() => this.props.history.push(`/${this.props.route}`));
	};

	componentDidMount() {
		api.single(this.props.route, this.props.match.params.messageId).then((resource) => {
			this.setState({
				userId: resource.userId,
				message: resource.message
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<form className="form">
					<div className="form-group">
						<label htmlFor="message">
							Edit {this.props.route.split('e')[0].toUpperCase() + this.props.route.split('m')[1]}
						</label>
						<input
							type="text"
							required
							className="form-control"
							onChange={this.handleFieldChange}
							id="message"
							value={this.state.message}
						/>
					</div>
					<button type="submit" onClick={this.updateMessage} className="btn btn-primary">
						Submit
					</button>
				</form>
			</React.Fragment>
		);
	}
}
