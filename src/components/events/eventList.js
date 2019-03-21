import React, { Component } from "react";

export default class EventList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="newsDivHeader">
                    <div className="eventButton">
                        <h1 className="newsDivHeader">Events</h1><hr></hr>
                        <button type="button" className="size1button"
                            onClick={() => {
                                this.props.history.push("/events/new");
                            }}>New Event</button>
                    </div>
                    <section className="newsDivHeader">
                        {this.props.events.map(event => (
                            <div key={event.id} className="newsDivHeader">
                                <h5 className="card-title attempt1">
                                    {event.name}
                                </h5>
                                <h6 className="card-subtitle">{event.date}</h6>
                                <h6 className="card-subtitle">
                                    {event.location}</h6>
                                    <button
                                        type="submit"
                                        onClick={() => this.props.deleteEvent(event.id)
                                            .then(() => this.props.history.push("/events"))}
                                        className="size1button"
                                    >
                                        Delete
          </button>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        this.props.history.push(`/events/${event.id}/edit`)
                                    }}
                                    className="size1button"
                                >
                                    Edit
                            </button>
                            </div>

                        ))}
                    </section>
                </div>
            </React.Fragment>
        )
    }
}