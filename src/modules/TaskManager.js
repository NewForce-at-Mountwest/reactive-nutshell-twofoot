export default {
  getAllTasks() {
    return fetch(`http://localhost:5002/tasks`)
    .then(e => e.json())
  },
  postTask(newTask) {
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
  getOneTask: id =>
  fetch(`http://localhost:5002/tasks/${id}`)
  .then(task => task.json()),

putTask(editedTask) {
  return fetch(`http://localhost:5002/tasks/${editedTask.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedTask)
  }).then(data => data.json());
},
patchTask(id, completedTask) {
  return fetch(`http://localhost:5002/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(completedTask)
  }).then(data => data.json());
},
}