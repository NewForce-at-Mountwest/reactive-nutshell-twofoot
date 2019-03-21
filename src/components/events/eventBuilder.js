import React, { Component } from "react";

export default class EventForm extends Component {
    // Sets State
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: ""
    };

    // This is how state gets its information
    handleFieldChange = evt => {
        const stateToChange = {};
        // This makes state get the value from
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    newEvent = evt => {
        evt.preventDefault();


        // Object Builder - This is what populates the Api
        const event = {
            name: this.state.eventName,
            date: this.state.eventDate,
            location: this.state.eventLocation
        };

        // After adding an event this directs the user back to 'events' home page

        this.props.addEvent(event)
            .then(() => this.props.history.push("/events"));
    }
    render() {
        return (
            <React.Fragment>
                <form className="event-form">
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="eventName" placeholder="Event" />
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" onChange={this.handleFieldChange} id="eventDate" placeholder="Date" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="eventLocation" placeholder="Location" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={this.newEvent}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment >
        )
    }
};


