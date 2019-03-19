
export default {
postUser(newUser) {
    return fetch(`http://localhost:5002/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  }
}