import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Login extends Component {
	state = {
		username: '',
		password: '',
		errorMessage: ''
	};

	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;

		this.setState(stateToChange);
	};

	handleLogin = (e) => {
		e.preventDefault();

		return fetch(`http://localhost:5002/users?username=${this.state.username}`)
			.then((r) => r.json())
			.then((user) => {
				let errorMessage = '';
				if (user.length === 0) {
					errorMessage = "We couldn't find your account";
					this.setState({ errorMessage: errorMessage });
				} else {
					if (this.state.password === user[0].password) {
						sessionStorage.setItem('credentials', user[0].id);
						this.props.history.push('/');
					} else {
						window.alert('Ur wRoNg!');
					}
				}
			});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleLogin}>
					<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
					<label htmlFor="inputusername">Username</label>
					<input
						onChange={this.handleFieldChange}
						type="text"
						id="username"
						placeholder="username"
						required=""
						autoFocus=""
					/>
					<label htmlFor="inputPassword">Password</label>
					<input
						onChange={this.handleFieldChange}
						type="password"
						id="password"
						placeholder="Password"
						required=""
					/>
					<button type="submit" className="btn btn-success">
						Sign In
					</button>
				</form>
				<h5>{this.state.error}</h5>
				<Link to="/register" className="btn btn-primary">
					Register
				</Link>
			</div>
		);
	}
}
