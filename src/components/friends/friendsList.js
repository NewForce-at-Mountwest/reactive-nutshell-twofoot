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
        this.props.findFriend(this.state.name).then((singleFriend)=> {
            console.log(singleFriend)
        const friendship = {
            userId: sessionStorage.getItem("credentials"), //get from session storage
            otherId: JSON.stringify(singleFriend[0].id)

        }
        console.log(friendship)
        this.props.addFriend(friendship)



         })
    };






    render() {
        const currentUser = sessionStorage.getItem("credentials")
        const friendsList = []
        const friendNames = []
        this.props.findFriend(this.state.name).then((x)=> {
                console.log(x)
        })





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
                <div className="friendsDivHeader">


                        <ul className="list-group">
                            <li className="list-group-item newsDivHeader2"><i className="fas fa-user-friends"></i> Your Friend List</li>
                            {
                                friendNames.map(name =>

                                    <li  key={+name[1]} className="list-group-item" >{name[0]} <button onClick={() => this.props.deleteFriend(name[1])} className="fas fa-trash friendDelete size1button" ></button> </li>






                                )
                            }  </ul >

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
                        className="size1button"
                        onClick={this.addNewFriend}>
                        + Add Friend
                    </button>
                </div>


</div>
            </React.Fragment>



        )
    }

}














