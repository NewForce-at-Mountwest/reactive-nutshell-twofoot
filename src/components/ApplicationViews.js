import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import EventList from "./events/eventList"
import EventBuilder from "./events/eventBuilder"
import EventApiManager from "./events/eventApiManager"
import EventEditForm from "./events/eventEditForm"

export default class ApplicationViews extends Component {

  state = {
    events: []
  }

  // Event Api Calls

  addEvent = eventObject =>
    EventApiManager.postEvent(eventObject)
      .then(() => EventApiManager.getAllEvents())
      .then(events => this.setState({ events: events }))

  deleteEvent = id =>
  EventApiManager.deleteEvent(id).then(events =>
    this.setState({events: events}))

    updateEvent = editedEventObject => {
      return EventApiManager.putEvent(editedEventObject)
      .then(() => EventApiManager.getAllEvents())
      .then(events => this.setState({events: events}))
    }
    // End of Event Api Calls


  componentDidMount() {
    const newState = {};
    EventApiManager.getAllEvents()
    .then(events => {
      newState.events = events
      this.setState(newState)})
  }
  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
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
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route exact
          path="/events" render={props => {
            return <EventList {...props}
            deleteEvent={this.deleteEvent}
            events={this.state.events} />
          }}
        />
        <Route path="/events/:eventId(\d+)/edit"
        render={props=> {
          return (
            <EventEditForm
            {...props}
            updateEvent={this.updateEvent}
            events={this.state.events} />
          )
        }} />
        <Route
          path="/events/new" render={props => {
            return <EventBuilder {...props} addEvent={this.addEvent} />
          }}
        />
      </React.Fragment>
    );
  }
}
