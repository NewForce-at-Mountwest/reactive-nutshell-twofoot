import React, { Component } from 'react'
import "./friendsList.css"
import friendsAPI from './friendsAPI';



export default class FriendsList extends Component {
    state = {
        users: [],
        friends: []
    }

    render() {
        let currentUser = "1"
        let friendsArray = []
        let friend = []


        this.props.friends.map(f => {


            if (f.userId === currentUser) {

                friendsArray.push(+f.otherId)
            }
            if (f.otherId === currentUser) {

                friendsArray.push(+f.userId)
            }
                return friendsArray
        })

        console.log(friendsArray)
        console.log(friend)


        friendsArray.forEach(f =>
            this.props.users.map(user => {
                if (user.id === f) {
                    console.log(user)
                    friend.push(user)
                }
            })
        )

        return (
            <React.Fragment>
                <ul className="list-group">
                    <li className="list-group-item active">Your Friend List</li>
                    {
                        friend.map(user =>
                            <li className="list-group-item" key={user.id}>{user.username}

                                <button  className="fas fa-trash friendDelete" ></button>
                            </li>


                        )
                    }

                </ul>
            </React.Fragment>


        )
    }

}














