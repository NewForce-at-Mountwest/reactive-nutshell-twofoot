import React, { Component } from 'react';

export default class MessageComponent extends Component {
	isUser = () => {
		if (this.props.message.userId === sessionStorage.getItem('credentials')) {
			return (
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => {
						this.props.history.push(`/${this.props.route}/${this.props.message.id}/edit`);
					}}
				>
					Edit
				</button>
			);
		} else {
		}
	};
	handleFriendship = () => {
		window.alert("Are you sure you want to add this friend?")
	};
	render() {
		return (
			<React.Fragment>
				<div key={this.props.message.id}>
					<span id={this.props.message.userId} className="chat-name" onClick={this.handleFriendship}>
						{this.props.message.user.username.split(' ')[0]}:
					</span>{' '}
					{this.props.message.message}
					{this.isUser()}
				</div>
			</React.Fragment>
		);
	}
}
