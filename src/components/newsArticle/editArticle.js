import React, { Component } from "react";
class EditArticles extends Component {
  state = {
    id: "",
    newTitle: "",
    newUrl: "",
    newSynopsis: "",
    newTimestamp: ""
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
      id: this.props.match.params.id,
      title: this.state.newTitle,
      synopsis: this.state.newSynopsis,
      url: this.state.newUrl,
      timestamp: now,
      userId: userId
    };

    fetch(`http://localhost:8080/news/${this.props.match.params.newsId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createArticle)
      })
    .then(() => {this.props.history.push("/")})
    .then(() => {this.props.updateNews()})
  };

  componentDidMount(){
    fetch(`http://localhost:8080/news/${this.props.match.params.newsId}`)
    .then(news => news.json())
    .then(news=>{
      this.setState({
        id: this.props.match.params.newsId,
        newTitle: news.title,
        newSynopsis: news.synopsis,
        newUrl: news.url,
        timestamp: news.timestamp
      })
    })
  }

  render() {
    return (
      <form className="newsDiv2" onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Edit Article</h1>
        <h4 className="color-white">
          <label htmlFor="title">Title: </label></h4><p>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="newTitle"
            placeholder="Scientists confirm earth is indeed round"
            required=""
            autoFocus=""
            value={this.state.newTitle}
          />
        </p>
        <h4 className="color-white">
          <label htmlFor="synopsis">Synopsis: </label></h4><p>
          <textarea
            onChange={this.handleFieldChange}
            id="newSynopsis"
            placeholder="This is where you put a synopsis for the nes article you are writing. Something about the earth's shape and scientists, yadda, yadda, yadda."
            required=""
            value={this.state.newSynopsis}
          ></textarea>
        </p>
        <h4 className="color-white">
          <label htmlFor="url">url:</label></h4><p>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="newUrl"
            placeholder="https://www.your-article.com/"
            required=""
            value={this.state.newUrl}
          />
        </p>
        <button className="size1button" type="submit">Save Article</button>
      </form>
    );
  }
}

export default EditArticles;
