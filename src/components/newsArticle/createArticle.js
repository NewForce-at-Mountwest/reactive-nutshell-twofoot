import React, { Component } from "react";

class CreateArticles extends Component {
  state = {
    title: "",
    url: "",
    synopsis: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault();

    let now = Date.now();
    let userId = sessionStorage.getItem("credentials")

    const createArticle = {
      title: this.state.title,
      synopsis: this.state.synopsis,
      url: this.state.url,
      timestamp: now,
      userId: userId
    };
    fetch(`http://localhost:8080/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createArticle)
      })
    .then(() => {this.props.history.push("/")})
    .then(() => {this.props.updateNews()})
  };

  render() {
    return (
      <form className="newsDiv2" onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Create an Article</h1>
        <h4 className="color-white">
          <label htmlFor="title">Title: </label></h4><p>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="title"
            placeholder="Scientists confirm earth is indeed round"
            required=""
            autoFocus=""
          />
        </p>
        <h4 className="color-white">
          <label htmlFor="synopsis">Synopsis: </label></h4><p>
          <textarea
            onChange={this.handleFieldChange}
            id="synopsis"
            rows="5"
            cols="20"
            placeholder="This is where you put a synopsis for the nes article you are writing. Something about the earth's shape and scientists, yadda, yadda, yadda."
            required=""
          ></textarea>
        </p>
        <h4 className="color-white">
          <label htmlFor="url">url:</label></h4><p>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="url"
            placeholder="https://www.your-article.com/"
            required=""
          />
        </p>
        <button className="size1button" type="submit">Save Article</button>
      </form>
    );
  }
}

export default CreateArticles;
