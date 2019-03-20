
export default {
postUser(newUser) {
    return fetch(`http://localhost:5002/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  },
getByEmail: email =>
  fetch(`http://localhost:5002/users?email=${email}`).then(e => e.json()),
getAllUsers(){
  return fetch(`http://localhost:5002/users/`, {
}).then(data => data.json())
}
}