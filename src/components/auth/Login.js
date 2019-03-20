import React, { Component } from "react"
import UserManager from '../../modules/UserManager'
export default class Login extends Component {
    state = {
        email: "",
        password: "",
        username: ""

    }

    handleFieldChangeUser = evt => {
        const stateToChange = {};
          stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };


      constructNewUser = evt => {
        evt.preventDefault();
            const userToPost = {
                username: this.state.userName,
                email: this.state.userEmail,
                password: this.state.userPassword,
            }
    UserManager.getByEmail(this.state.email).then(user => {
                this.props.registerUser(userToPost).then(user => {
                    console.log(user);
                    sessionStorage.setItem("credentials", JSON.stringify(user.id))
                    localStorage.setItem("credentials", JSON.stringify(user.id));
                    this.props.history.push("/");
                    this.props.refreshUsers()})})}


    render() {
        return (
            <form onSubmit={this.constructNewUser}>
                <h1 className="h3 mb-3 font-weight-normal">Please register an account.</h1>
                <label htmlFor="inputEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChangeUser} type="email"
                       id="userEmail"
                       placeholder="Email address"
                       required="" autoFocus="" />
                         <label htmlFor="inputEmail">
                   Username
                </label>
                <input onChange={this.handleFieldChangeUser} type="text"
                       id="userName"
                       placeholder="Username"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChangeUser} type="password"
                       id="userPassword"
                       placeholder="Password"
                       required="" />
                <button type="submit">
                    Sign in!
                </button>
            </form>
        )
    }
}