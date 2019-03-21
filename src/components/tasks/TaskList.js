import React, { Component } from "react"

export default class TaskList extends Component {
  render() {
    return (
      <React.Fragment >
        <div className="newsDivHeader">
          <div className="addButton">
            <h1 className="newsDivHeader">Tasks</h1><hr></hr>
            <button type="button"
              className="btn btn-success size1button"
              onClick={() => {
                this.props.history.push(`/tasks/new`)
              }
              }>
              Add new
            </button>
          </div>
          <article>
            {this.props.tasks.map(task => {
              if (task.isCompleted === false && task.userId === sessionStorage.getItem('credentials')) {
                return <div className="newsDivHeader" key={task.id}>
                  {task.name}<p><input type="checkbox" onChange={() => this.props.completeTask({ isCompleted: true }, task.id)}></input>Finished?</p>
                  <p>{task.completionDate}</p>
                  <button className="size1button" onClick={() =>
                    this.props
                      .deleteTask(task.id)
                      .then(() => this.props.history.push("/tasks"))
                  }>Remove task</button>
                  <button className="size1button" onClick={() =>
                    this.props.history.push(`/tasks/${task.id}/edit`)
                  }>Edit task</button>
                </div>
              }
            }
            )}
          </article></div>
      </React.Fragment>
    )
  }
}