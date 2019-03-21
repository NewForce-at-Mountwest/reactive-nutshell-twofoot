import React, { Component } from "react";
import EventApiManager from "./eventApiManager"

export default class EventEditForm extends Component {

    state = {
        eventName: "",
        eventDate: "",
        eventLocation: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    updateExistingEvent = evt => {
        evt.preventDefault();

        const editEvent = {
            id: this.props.match.params.eventId,
            name: this.state.eventName,
            date: this.state.eventDate,
            location: this.state.eventLocation
        };

        this.props.updateEvent(editEvent)
            .then(() => this.props.history.push("/events"));
    };

    componentDidMount() {
        EventApiManager.getOneEvent(this.props.match.params.eventId).then(event => {
            this.setState({
                eventName: event.name,
                eventDate: event.date,
                eventLocation: event.location
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <form className="event-form">
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="eventName" value={this.state.eventName} />
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" onChange={this.handleFieldChange} id="eventDate" value={this.state.eventDate} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="eventLocation" value={this.state.eventLocation} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={this.updateExistingEvent}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        )
    }
}
