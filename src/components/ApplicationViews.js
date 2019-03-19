import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import TaskList from "./tasks/TaskList"
import TaskBuilder from './tasks/TaskBuilder'
import TaskManager from '../modules/TaskManager'
import TaskEditForm from "./tasks/TaskEditForm";
export default class ApplicationViews extends Component {
  state = {
    users: [],
    tasks: [],
    events: [],
    friends: [],
    messages: []
  };
  componentDidMount() {
    const newState = {};
    TaskManager.getAllTasks()
      .then(allTasks => {
        newState.tasks = allTasks
        this.setState(newState)
      }
      )
  }
  deleteTask = id => {
    return TaskManager.deleteTask(id).then(tasks =>
      this.setState({
        tasks: tasks
      })
    );
  };
  addTask = task =>
    TaskManager.postTask(task)
      .then(() => TaskManager.getAllTasks())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  editTask = editedTask => {
    return TaskManager.putTask(editedTask)
      .then(() => TaskManager.getAllTasks())
      .then(tasks => {
        this.setState({
          tasks: tasks
        });
      });
  };
  completeTask = (taskId, taskObject) => {
    return TaskManager.patchTask(taskObject, taskId)
    .then(() => TaskManager.getAllTasks())
    .then(tasks =>
      this.setState({
      tasks: tasks
    }))
  }
  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
            return <Login />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TaskList {...props}
              addTask={this.addTask}
              tasks={this.state.tasks}
              deleteTask={this.deleteTask}
              completeTask={this.completeTask} />
          }}
        />
        <Route
          exact path="/tasks/new" render={props => {
            return <TaskBuilder {...props}
              addTask={this.addTask}
              tasks={this.state.tasks} />
          }} />
        <Route
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return  <TaskEditForm {...props}
                tasks={this.state.tasks}
                editTask={this.editTask}/>
            }}/>
        </React.Fragment>
    );
  }
}
