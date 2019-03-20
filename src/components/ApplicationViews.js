import { Route } from "react-router-dom";
import React, { Component } from "react";
import ArticleList from "./newsArticle/articleList";
import CreateArticles from "./newsArticle/createArticle";
import EditArticles from "./newsArticle/editArticle"

export default class ApplicationViews extends Component {
  state = {
    news: [],
    username: []
  };

  updateNews = () => {
    fetch(`http://localhost:8080/news`)
      .then(news => news.json())
      .then(parsedNews => {
        this.setState({ news: parsedNews });
      });
  };

  articleDelete = id => {
    fetch(`http://localhost:8080/news/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:8080/news?_expand=user`))
      .then(news => news.json())
      .then(parsedNews => {
        this.setState({ news: parsedNews });
      });
  };

  deleteArticle = id => {
    this.articleDelete(id);
  };

  componentDidMount() {
    fetch(`http://localhost:8080/news`)
      .then(news => news.json())
      .then(parsedNews => {
        this.setState({ news: parsedNews });
      })
      .then(sessionStorage.setItem("userId", JSON.stringify(1)));
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <ArticleList
                {...props}
                news={this.state.news}
                deleteArticle={this.deleteArticle}
              />
            );
          }}
        />

        <Route
          path="/create-article"
          render={props => {
            return (
              <CreateArticles
                {...props}
                news={this.state.news}
                updateNews={this.updateNews}
              />
            );
          }}
        />

        <Route
          path="/news/:newsId(\d+)/edit"
          render={props => {
            return (
              <EditArticles
                {...props}
                news={this.state.news}
                updateNews={this.updateNews}
              />
            );
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
