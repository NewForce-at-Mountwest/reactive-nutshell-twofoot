const remoteURL = "http://localhost:5002"




            ////////////////////////////////////
            /////----Friends API calls------////
            ////////////////////////////////////


export default {



    getFriends: () => {
        return fetch(`${remoteURL}/friends`)
        .then(r => r.json());

    },
    getFriendsUserId: (currentUser) => {
        return fetch(`${remoteURL}/friends?userId=${currentUser}`)
        .then(r => r.json())


    },
    getFriendsOther: (currentUser) => {
        return fetch(`${remoteURL}/friends?otherId=${currentUser}`)
        .then(r => r.json());
    },
    getFriendTableRelationId: (otherId, userId) => {
        return fetch(`${remoteURL}/friends?otherId=${otherId}&&userId=${userId}`)
        .then(r => r.json())

    },
    addFriend: (newFriend) => {
        return fetch (`${remoteURL}/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFriend)

        }).then(f => f.json())
    },
    deleteFriend: (friendId) => {
        return fetch(`${remoteURL}/friends/${friendId}`, {
            method: "DELETE"
             }).then(f=>f.json())
             .then(() => fetch(`${remoteURL}/friends`))
             .then(f=>f.json())
    },



            ////////////////////////////////////
            /////----Users API calls------//////
            ////////////////////////////////////

    getUsers: () => {
        return fetch(`${remoteURL}/users`)
        .then(u=> u.json())
    }

}
