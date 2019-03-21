import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import FriendsList from "./friends/friendsList";
import friendsAPI from "./friends/friendsAPI";




export default class ApplicationViews extends Component {

  state = {
    users: [],
    friends: [],
    otherId:[]
  }



  deleteFriend = userId => {
    return friendsAPI.deleteFriend(userId)
      .then(friends => this.setState({
        friends: friends
      }))
  }

  findFriend = name => {
    return friendsAPI.getFriendName(name)




  }

  addFriend = (friendId) => {

  return friendsAPI.addFriend(friendId)
      .then(friends => this.setState({
        friends: friends
      }))
  }



  componentDidMount() {
    const newState = {}
    // const currentUser = "1"   //<-----set this in future with session storage at login****//

    ////set Friends state/////
    friendsAPI.getFriends()
      .then(friends => ( newState.friends = friends ))
      .then(friendsAPI.getUsers)
      .then(users => (newState.users = users))
      .then(()=> this.setState(newState))


    console.log(newState)
  }


render() {


    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
           path="/friends" render={props => {
            return <FriendsList
              {...props}
              users={this.state.users}
              friends={this.state.friends}
              deleteFriend={this.deleteFriend}
              getFriendObject={this.getFriendObject}
              addFriend={this.addFriend}
              findFriend={this.findFriend} />
          }} />





        <Route
          path="/messages" render={props => {
            return
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
