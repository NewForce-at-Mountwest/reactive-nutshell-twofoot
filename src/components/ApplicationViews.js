import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import ArticleList from './newsArticle/articleList';
import CreateArticles from './newsArticle/createArticle';
import EditArticles from './newsArticle/editArticle';
import Register from './auth/Login';
import Login from './auth/ReallyLogin'
import TaskList from './tasks/TaskList';
import TaskBuilder from './tasks/TaskBuilder';
import TaskManager from '../modules/TaskManager';
import TaskEditForm from './tasks/TaskEditForm';
import UserManager from '../modules/UserManager';
import ChatComponent from './Chat/ChatComponent';
import MessageEditForm from './Chat/MessageEditForm';
import EventList from './events/eventList';
import EventBuilder from './events/eventBuilder';
import EventApiManager from './events/eventApiManager';
import EventEditForm from './events/eventEditForm';
import FriendsList from './friends/friendsList';
import friendsAPI from './friends/friendsAPI';

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

	//News Section
	updateNews = () => {
		fetch(`http://localhost:5002/news`).then((news) => news.json()).then((parsedNews) => {
			this.setState({ news: parsedNews });
		});
	};

	updateNews = () => {
		fetch(`http://localhost:5002/news`).then((news) => news.json()).then((parsedNews) => {
			this.setState({ news: parsedNews });
		});
	};

	articleDelete = (id) => {
		fetch(`http://localhost:5002/news/${id}`, {
			method: 'DELETE'
		})
			.then(() => fetch(`http://localhost:5002/news?_expand=user`))
			.then((news) => news.json())
			.then((parsedNews) => {
				this.setState({ news: parsedNews });
			});
	};

	deleteArticle = (id) => {
		this.articleDelete(id);
	};

	// Event Api Calls

	addEvent = (eventObject) =>
		EventApiManager.postEvent(eventObject)
			.then(() => EventApiManager.getAllEvents())
			.then((events) => this.setState({ events: events }));

	deleteEvent = (id) => EventApiManager.deleteEvent(id).then((events) => this.setState({ events: events }));

	updateEvent = (editedEventObject) => {
		return EventApiManager.putEvent(editedEventObject)
			.then(() => EventApiManager.getAllEvents())
			.then((events) => this.setState({ events: events }));
	};
	// End of Event Api Calls

	//User Management
	isAuthenticated = () => sessionStorage.getItem('credentials') !== null;

	registerUser = (userObject) => UserManager.postUser(userObject);

	refreshUsers = () =>
		UserManager.getAllUsers().then((parsedUsers) => {
			this.setState({ users: parsedUsers });
		});

	//Messages

	addMessage = (newItem) => {
		return fetch(`http://localhost:5002/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newItem)
		})
			.then((d) => d.json())
			.then(() => {
				fetch('http://localhost:5002/messages?_expand=user')
					.then((r) => r.json())
					.then((messages) => this.setState({ messages: messages }));
			});
	};
	updateMessage = (editedObject) => {
		return fetch(`http://localhost:5002/messages/${editedObject.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editedObject)
		})
			.then((data) => data.json())
			.then(() =>
				fetch('http://localhost:5002/messages?_expand=user').then((r) => r.json()).then((messages) => {
					this.setState({
						messages: messages
					});
				})
			);
	};

	//Tasks Sections

	deleteTask = (id) => {
		return TaskManager.deleteTask(id).then((tasks) =>
			this.setState({
				tasks: tasks
			})
		);
	};
	addTask = (task) =>
		TaskManager.postTask(task).then(() => TaskManager.getAllTasks()).then((tasks) =>
			this.setState({
				tasks: tasks
			})
		);

	editTask = (editedTask) => {
		return TaskManager.putTask(editedTask).then(() => TaskManager.getAllTasks()).then((tasks) => {
			this.setState({
				tasks: tasks
			});
		});
	};
	completeTask = (taskId, taskObject) => {
		return TaskManager.patchTask(taskObject, taskId).then(() => TaskManager.getAllTasks()).then((tasks) =>
			this.setState({
				tasks: tasks
			})
		);
	};
	//Friends Section
	deleteFriend = (userId) => {
		return friendsAPI.deleteFriend(userId).then((friends) =>
			this.setState({
				friends: friends
			})
		);
	};

	findFriend = (name) => {
		return friendsAPI.getFriendName(name);
	};

	addFriend = (friendId) => {
		return friendsAPI.addFriend(friendId).then((friends) =>
			this.setState({
				friends: friends
			})
		);
	};

	//Component Did Mount API Calls and Intial State set
	componentDidMount() {
		const newState = {};
		fetch(`http://localhost:5002/news`).then((news) => news.json()).then((parsedNews) => {
			newState.news = parsedNews;
			TaskManager.getAllTasks().then((allTasks) => {
				newState.tasks = allTasks;
				UserManager.getAllUsers().then((allUsers) => {
					newState.users = allUsers;
					return fetch('http://localhost:5002/messages?_expand=user')
						.then((r) => r.json())
						.then((messages) => {
							newState.messages = messages;
							EventApiManager.getAllEvents().then((events) => {
								newState.events = events;
								friendsAPI.getFriends().then((friends) => (newState.friends = friends));
								this.setState(newState);
							});
						});
				});
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<Route
					exact
					path="/"
					render={(props) => {
						if (this.isAuthenticated()) {
							return <ArticleList {...props} news={this.state.news} deleteArticle={this.deleteArticle} />;
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>

				<Route
					path="/create-article"
					render={(props) => {
						if (this.isAuthenticated()) {
							return <CreateArticles {...props} news={this.state.news} updateNews={this.updateNews} />;
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>
				<Route
					path="/news/:newsId(\d+)/edit"
					render={(props) => {
						if (this.isAuthenticated()) {
							return <EditArticles {...props} news={this.state.news} updateNews={this.updateNews} />;
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>
				<Route
					exact
					path="/register"
					render={(props) => {
						return <Register {...props} registerUser={this.registerUser} refreshUsers={this.refreshUsers} />;
					}}
				/>
				<Route exact path="/login" render={(props)=>{
					return <Login {...props}/>;
				}}/>
				<Route
					path="/messages/:messageId(\d+)/edit"
					render={(props) => {
						return (
							<MessageEditForm
								{...props}
								messages={this.state.messages}
								updateResource={this.updateMessage}
								route="messages"
							/>
						);
					}}
				/>
				<Route
					path="/messages"
					render={(props) => {
						if (this.isAuthenticated()) {
							return (
								<ChatComponent
									{...props}
									messages={this.state.messages}
									addMessage={this.addMessage}
									route="messages"
									addFriend={this.addFriend}
								/>
							);
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>
				<Route
					path="/friends"
					render={(props) => {
						if (this.isAuthenticated()) {
							return (
								<FriendsList
									{...props}
									users={this.state.users}
									friends={this.state.friends}
									deleteFriend={this.deleteFriend}
									getFriendObject={this.getFriendObject}
									addFriend={this.addFriend}
									findFriend={this.findFriend}
								/>
							);
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>

				<Route
					exact
					path="/events"
					render={(props) => {
						if (this.isAuthenticated()) {
							return <EventList {...props} deleteEvent={this.deleteEvent} events={this.state.events} />;
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>
				<Route
					path="/events/:eventId(\d+)/edit"
					render={(props) => {
						return <EventEditForm {...props} updateEvent={this.updateEvent} events={this.state.events} />;
					}}
				/>
				<Route
					path="/events/new"
					render={(props) => {
						return <EventBuilder {...props} addEvent={this.addEvent} />;
					}}
				/>

				<Route
					exact
					path="/tasks"
					render={(props) => {
						if (this.isAuthenticated()) {
							return (
								<TaskList
									{...props}
									addTask={this.addTask}
									tasks={this.state.tasks}
									deleteTask={this.deleteTask}
									completeTask={this.completeTask}
								/>
							);
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>
				<Route
					exact
					path="/tasks/new"
					render={(props) => {
						if (this.isAuthenticated()) {
							return <TaskBuilder {...props} addTask={this.addTask} tasks={this.state.tasks} />;
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>
				<Route
					path="/tasks/:taskId(\d+)/edit"
					render={(props) => {
						if (this.isAuthenticated()) {
							return <TaskEditForm {...props} tasks={this.state.tasks} editTask={this.editTask} />;
						} else {
							return <Redirect to="/login" />;
						}
					}}
				/>
			</React.Fragment>
		);
	}
}
