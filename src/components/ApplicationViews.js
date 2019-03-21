import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import FriendsList from "./friends/friendsList";
import friendsAPI from "./friends/friendsAPI";
import ArticleList from "./newsArticle/articleList";
import CreateArticles from "./newsArticle/createArticle";
import EditArticles from "./newsArticle/editArticle"
import Login from "./auth/Login";
import TaskList from "./tasks/TaskList"
import TaskBuilder from './tasks/TaskBuilder'
import TaskManager from '../modules/TaskManager'
import TaskEditForm from "./tasks/TaskEditForm";
import UserManager from '../modules/UserManager'
export default class ApplicationViews extends Component {
  state = {
    news: [],
    username: [],
    users: [],
    tasks: [],
    events: [],
    friends: [],
    messages: []
  };


  deleteFriend = userId => {
    return friendsAPI.deleteFriend(userId)
      .then(friends => this.setState({
        friends: friends
      }))
  }

  findFriend = name => {
    return friendsAPI.getFriendName(name)
  }

  addFriend = (friendId) => {

  return friendsAPI.addFriend(friendId)
      .then(friends => this.setState({
        friends: friends
      }))
  }

  updateNews = () => {
    fetch(`http://localhost:5002/news`)
      .then(news => news.json())
      .then(parsedNews => {
        this.setState({ news: parsedNews });
      });
  };

  articleDelete = id => {
    fetch(`http://localhost:5002/news/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/news?_expand=user`))
      .then(news => news.json())
      .then(parsedNews => {
        this.setState({ news: parsedNews });
      });
  };

  deleteArticle = id => {
    this.articleDelete(id);
  };
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
  registerUser = userObject =>
    UserManager.postUser(userObject);

  refreshUsers = () =>
    UserManager.getAllUsers()
      .then(parsedUsers => {
        this.setState({ users: parsedUsers });
      });


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

  componentDidMount() {
    const newState = {};
    fetch(`http://localhost:5002/news`)
      .then(news => news.json())
      .then(parsedNews => {
        this.setState({ news: parsedNews });
      })
      .then(friendsAPI.getFriends())
      .then(friends => ( newState.friends = friends ))
      .then(TaskManager.getAllTasks())
      .then(allTasks => { newState.tasks = allTasks })
        .then(UserManager.getAllUsers)
        .then(allUsers => { newState.users = allUsers })
      this.setState(newState)
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null



render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if(this.isAuthenticated()){
            return (
              <ArticleList
                {...props}
                news={this.state.news}
                deleteArticle={this.deleteArticle}
              />
            )} else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/create-article"
          render={props => {
            if(this.isAuthenticated()){
            return (
              <CreateArticles
                {...props}
                news={this.state.news}
                updateNews={this.updateNews}
              />
            )} else {
              return <Redirect to="/login" />
            }
          }}
        />






        <Route

          path="/news/:newsId(\d+)/edit"
          render={props => {
            if(this.isAuthenticated()){
            return (
              <EditArticles
                {...props}
                news={this.state.news}
                updateNews={this.updateNews}
              />
            )} else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          exact path="/login" render={props => {
            return <Login {...props}
              registerUser={this.registerUser}
              refreshUsers={this.refreshUsers} />;
          }} />

        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return <FriendsList
              {...props}
              users={this.state.users}
              friends={this.state.friends}
              deleteFriend={this.deleteFriend}
              getFriendObject={this.getFriendObject}
              addFriend={this.addFriend}
              findFriend={this.findFriend} />;
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
              return <TaskEditForm {...props}
                tasks={this.state.tasks}
                editTask={this.editTask} />
            } else {
              return <Redirect to="/login" />;
            }
          }} />
      </React.Fragment>
    )
  }
}