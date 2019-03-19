import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import TaskList from "./tasks/TaskList"
import TaskBuilder from './tasks/TaskBuilder'
import TaskManager from '../modules/TaskManager'
import TaskEditForm from "./tasks/TaskEditForm";
import UserManager from '../modules/UserManager'
export default class ApplicationViews extends Component {
  state = {
    users: [],
    tasks: [],
    events: [],
    friends: [],
    messages: []
  };
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;
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
  addUser = user =>
    UserManager.postUser(user)
      .then(users =>
        this.setState({
          users: users
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
            if (this.isAuthenticated()) {
              return <null />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
         <Route
          exact path="/login" render={props => {
              return <Login {...props}
              addUser={this.addUser}
              users={this.props.users}/>;
          }}/>

        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return <null />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return <null />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            if (this.isAuthenticated()) {
            return <TaskList {...props}
              addTask={this.addTask}
              tasks={this.state.tasks}
              deleteTask={this.deleteTask}
              completeTask={this.completeTask} />
            } else {
              return <Redirect to="/login" />;
            }
           }} />
        <Route
          exact path="/tasks/new" render={props => {
            if (this.isAuthenticated()) {
            return <TaskBuilder {...props}
              addTask={this.addTask}
              tasks={this.state.tasks} />
            } else {
              return <Redirect to="/login" />;
            }
          }} />
        <Route
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
            return  <TaskEditForm {...props}
                tasks={this.state.tasks}
                editTask={this.editTask}/>
              } else {
                return <Redirect to="/login" />;
              }
            }}/>
        </React.Fragment>
    )}}