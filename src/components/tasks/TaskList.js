import React, { Component } from "react"

export default class TaskList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="addButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push(`/tasks/new`)
            }
            }>
            Add new
            </button>
        </div>
        <article>
          <h1>Tasks</h1>
          {this.props.tasks.map(task => {
            if (task.isCompleted === false) {
              return <div key={task.id}>
                {task.name}<p><input type="checkbox" onChange={() => this.props.completeTask({ isCompleted: true }, task.id)}></input>Finished?</p>
                <p>{task.completionDate}</p>
                <button onClick={() =>
                  this.props
                    .deleteTask(task.id)
                    .then(() => this.props.history.push("/tasks"))
                }>Remove task</button>
                <button onClick={() =>
                  this.props.history.push(`/tasks/${task.id}/edit`)
                }>Edit task</button>
              </div>
            }
          }
          )}
        </article>
      </React.Fragment>
    )
  }
}