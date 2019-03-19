const eventHost = "http://localhost:5002"
export default {
    getAllEvents: () => {
        return fetch(`${eventHost}/events`).then(e => e.json())
    },
    postEvent: (newEvent) => {
        return fetch(`${eventHost}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        }).then(data => data.json())
    },
    deleteEvent: (id) => {
        return fetch(`${eventHost}/events/${id}`, {
            method: "DELETE"
        })
        .then(() => fetch(`${eventHost}/events`))
        .then(e=>e.json());
    }
}