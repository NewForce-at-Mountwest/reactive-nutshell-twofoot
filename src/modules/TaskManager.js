export default {
  getAll() {
    return fetch(`http://localhost:5002/tasks`)
    .then(e => e.json())
  },
  post(newTask) {
    return fetch(`http://localhost:5002/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    }).then(data => data.json())
  },
  deleteTask: id => {
    return fetch(`http://localhost:5002/tasks/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/tasks`))
      .then(e => e.json());
  },
}