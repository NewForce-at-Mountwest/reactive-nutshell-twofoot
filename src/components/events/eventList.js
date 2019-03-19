import React, { Component } from "react";
import "./event.css";

export default class EventList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="eventButton">
                    <button type="button" className="btn btn-primary"
                        onClick={() => {
                            this.props.history.push("/events/new");
                        }}>New Event</button>
                </div>
                <section className="events">
                    {this.props.events.map(event => (
                        <div key={event.id} className="card card-event">
                            <h5 className="card-title attempt1">
                                {event.name}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">{event.date}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {event.location}</h6>
                            <div className="btn-container">
                                    <button
                                        type="submit"
                                        onClick={() => this.props.deleteEvent(event.id)
                                            .then(() => this.props.history.push("/events"))}
                                        className="btn btn-primary event-attempt-btn"
                                    >
                                        Delete
          </button>
                                </div>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        this.props.history.push(`/events/${event.id}/edit`)
                                    }}
                                    className="btn btn-primary event-attempt-btn"
                                >
                                    Edit
                            </button>
                            </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
}