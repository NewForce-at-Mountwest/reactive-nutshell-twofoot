import React, { Component} from "react"

export default class TaskBuilder extends Component{
    state = {
        taskName: "",
        completionDate: "",
        isCompleted : "",
        userId: ""
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    constructNewTask = evt => {
        evt.preventDefault();
            const task = {
                name: this.state.taskName,
                completionDate: this.state.completionDate,
                isCompleted: false,
                userId: sessionStorage.getItem('credentials')
            }
            this.props
                .addTask(task)
                .then(() => this.props.history.push("/tasks"));
        }
render(){
return(
<React.Fragment>
<form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskName">Task name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="taskName"
                            placeholder="Task name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="completionDate">Date to complete by</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="completionDate"
                            placeholder="date"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.constructNewTask}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>

</React.Fragment>
)
}}