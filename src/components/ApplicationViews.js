import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import FriendsList from "./friends/friendsList";
import friendsAPI from "./friends/friendsAPI";
// import FriendsView from "./friends/friendsList"


export default class ApplicationViews extends Component {

  state = {
    users: [],
    friends: []
  }



  deleteFriend = userId => {
    return friendsAPI.deleteFriend(userId)
    .then(friends => this.setState({
      friends:friends
    }))
  }

  getFriendObject = (otherId,userId) => {
    return  friendsAPI.getFriendTableRelationId(otherId,userId)
    .then(friends => this.setState({
      friends:friends
    }))
  }


  componentDidMount() {
    const newState = {}
    const currentUser = "1"   //<-----set this in future with session storage at login****//


    ////set Friends state/////
    friendsAPI.getFriends()
      .then(friends => { newState.friends = friends })
      .then(friendsAPI.getUsers)
      .then(users => {
        newState.users = users
        this.setState(newState)
      })

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
          exact path="/friends" render={props => {
            return <FriendsList
              users={this.state.users}
              friends={this.state.friends}
              deleteFriend={this.deleteFriend}
              getFriendObject={this.getFriendObject} />
          }} />
          {/* <Route exact path="/transactions/:transactionsId(\d+)" render={(props) => {
                     return <FriendDetail
                             {...props}
                             users={this.state.users}
                             friends={this.state.friends}
                             deleteFriend={this.deleteFriend}
                             getFriendObject={this.getFriendObject}
                              />
                }}/> */}



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
