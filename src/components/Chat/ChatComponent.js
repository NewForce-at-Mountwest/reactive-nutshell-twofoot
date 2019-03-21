import React, { Component } from 'react';
import "../newsArticle/newsArticle.css"
import './chat.css';
import MessageComponent from './MessageComponent';

export default class ChatComponent extends Component {
	state = {
		userId: sessionStorage.getItem('credentials'),
		message: ''
	};
	scrollToBottom = () => {
		const chatDiv = document.getElementById('chat-messages');
		chatDiv.scrollTop = chatDiv.scrollHeight;
	};

	handleFieldChange = (e) => {
		const stateToChange = {};
		stateToChange[e.target.id] = e.target.value;
		this.setState(stateToChange);
	};
	Message = (e) => {
		e.preventDefault();
		const item = {
			message: this.state.message,
			userId: this.state.userId
		};
		this.props.addMessage(item).then(() => this.props.history.push(`/${this.props.route}`));
	};
	componentDidMount() {
		const chatDiv = document.getElementById('chat-messages');
		chatDiv.scrollTop = chatDiv.scrollHeight;
	}
	render() {
		return (
			<React.Fragment>
				<div className="chat-messages" id="chat-messages" key={this.state.userId}>
					{this.props.messages.map((message) => {
						return <MessageComponent {...this.props} message={message} route={this.props.route} />;
					})}
				</div>
				<div className="chat-input">
					<form className="form-control chat">
						<input
							type="text"
							id="message"
							placeholder="Don't be shy! Say Hi!"
							onChange={this.handleFieldChange}
						/>
						<button type="submit" onClick={this.Message} className="btn size1button">
							Submit
						</button>
					</form>
				</div>
			</React.Fragment>
		);
	}
}
