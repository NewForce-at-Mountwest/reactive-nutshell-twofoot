import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import ArticleList from "./newsArticle/articleList";
import CreateArticle from "./newsArticle/createArticle"

export default class ApplicationViews extends Component {
  state = {
    news: [],
    username: []
  };

  componentDidMount() {
    fetch(`http://localhost:8080/news`)
      .then(news => news.json())
      .then(parsedNews => {
        this.setState({ news: parsedNews });
      })
    .then(sessionStorage.setItem("userId", JSON.stringify(1)))
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <ArticleList {...props} news={this.state.news} />;
          }}
        />

        <Route
          path="/create-article"
          render={props => {
            return <CreateArticle {...props} news={this.state.news}/>;
          }}
        />

        <Route
          path="/friends"
          render={props => {
            return null;
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages"
          render={props => {
            return null;
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks"
          render={props => {
            return null;
            // Remove null and return the component which will show the user's tasks
          }}
        />
      </React.Fragment>
    );
  }
}
