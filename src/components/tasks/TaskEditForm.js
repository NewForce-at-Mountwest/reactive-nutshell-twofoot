import React, { Component } from "react";
import TaskManager from "../../modules/TaskManager";

export default class TaskEditForm extends Component {
    state = {
        taskName: "",
        taskCompletionDate: "",
        IsCompleted : ""
    };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingTask = evt => {
    evt.preventDefault();
      const editedTask = {
        id: this.props.match.params.taskId,
        name: this.state.taskName,
        completionDate: this.state.taskCompletionDate,
        isCompleted : false
      };
      this.props
        .editTask(editedTask)
        .then(() => this.props.history.push("/tasks"));
  };

  componentDidMount() {
    TaskManager.getOneTask(this.props.match.params.taskId).then(task => {
      this.setState({
        taskName: task.name,
        taskCompletionDate: task.completionDate,
        isCompleted: false,
        id: this.props.match.params.taskId
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="taskForm">
          <div className="form-group">
            <label htmlFor="taskName">Change task</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="taskName"
              value={this.state.taskName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="breed">Change date to complete by</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="taskCompletionDate"
              value={this.state.taskCompletionDate}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingTask}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}