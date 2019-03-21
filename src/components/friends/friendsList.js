import React, { Component } from 'react'
import "./friendsList.css"




export default class FriendsList extends Component {
    state = {
        users: [],
        friends: [],
        userId:[],
        otherId: [],

    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
      };

    addNewFriend = evt =>{
        evt.preventDefault();
        const y = this.state.name
        const x = this.state.otherId
        console.log(x)
        // const friendId = this.props.findFriend(this.state.name)
        const friendship = {
            userId: "1", //get from session storage
            otherId: x

        }
        console.log(friendship)
        this.props.addFriend(friendship)

        // .then(()=> this.props.history.push("/friends"))


    };




    render() {
        let currentUser = "1"
        let friendsList = []
        let friendNames = []
        let x = this.props.findFriend(this.state.name)
        console.log(x)



        this.props.friends.map(f => {



            if (f.userId === currentUser) {

                friendsList.push([f.otherId,f])
            }
            if (f.otherId === currentUser) {

                friendsList.push([f.userId,f])
            }
            return friendsList
        })

        console.log(friendsList)
        console.log(this.props.users)
        console.log(friendNames)


        friendsList.map(friend =>
            this.props.users.map(user => {
                if (user.id === +friend[0]) {
                     friendNames.push([user.username,friend[1].id])
                }
            })
        )



        return (
            <React.Fragment>



                        <ul className="list-group">
                            <li className="list-group-item active">Your Friend List</li>
                            {
                                friendNames.map(name =>

                                    <li  key={+name[1]} className="list-group-item" >{name[0]} <button onClick={() => this.props.deleteFriend(name[1])
                                    } className="fas fa-trash friendDelete" ></button> </li>





                                )
                            }  </ul>

                <div className="addFriend">

            <label htmlFor="name">Search Friends</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
              placeholder="Enter Friends Name"/>

                    <button type="button"
                        className="btn btn-success"
                        onClick={this.addNewFriend}>
                        Add Friend
                    </button>
                </div>
                <label htmlFor="otherId"></label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="otherId"
              placeholder="confirm friend"
              value={x}
              />

              {<div>{this.state.name}{this.state.otherId}
              <button onClick={this.addNewFriend}>Confirm</button>


              </div>}




            </React.Fragment>



        )
    }

}














