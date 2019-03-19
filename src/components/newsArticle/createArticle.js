import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiManager from "./apiManager";

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
    let userId = sessionStorage.getItem("userId")

    const createArticle = {
      title: this.state.title,
      synopsis: this.state.synopsis,
      url: this.state.url,
      timestamp: now,
      userId: userId
    };

    apiManager.createArticle(createArticle);
  };

  render() {
    return (
      <form className="mainPage" onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Create an Article</h1>
        <p>
          <label htmlFor="title">Title: </label>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="title"
            placeholder="Scientists confirm earth is indeed round"
            required=""
            autoFocus=""
          />
        </p>
        <p>
          <label htmlFor="synopsis">Synopsis: </label>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="synopsis"
            placeholder="This is where you put a synopsis for the nes article you are writing. Something about the earth's shape and scientists, yadda, yadda, yadda."
            required=""
          />
        </p>
        <p>
          <label htmlFor="url">url:</label>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="url"
            placeholder="https://www.your-article.com/"
            required=""
          />
        </p>
        <button type="submit">Save Article</button>
      </form>
    );
  }
}

export default CreateArticles;
