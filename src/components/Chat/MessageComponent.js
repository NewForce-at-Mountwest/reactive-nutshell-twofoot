import React, { Component } from 'react';

export default class MessageComponent extends Component {
	isUser = () => {
		if (this.props.message.userId === sessionStorage.getItem('credentials')) {
			return (
				<button
					type="button"
					className="btn size1button"
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
	handleFriendship = (e) => {
		window.alert('Are you sure you want to add this friend?');
		const friendshipObject = {
			otherId: e.target.id,
			userId: sessionStorage.getItem('credentials')
		};

		return fetch('http://localhost:5002/friends', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(friendshipObject)
		}).then((d) => d.json()).then(()=> window.alert("They're now your friend!"))
	};

	render() {
		return (
			<React.Fragment>
				<div key={this.props.message.id} className="chat">
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
