import React, { Component } from "react";
import { Link } from "react-router-dom";
var moment = require("moment");

class ArticleBuilder extends Component {
  state = {
    news: this.props.news
  };

  render() {
    if (this.props.news.userId === sessionStorage.getItem("userId")) {
      return (
        <div className="card news" id={this.props.news.id}>
          <div className="card-body">
            <h5 className="card-title">{this.props.news.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {moment(Number(this.props.news.timestamp))
                .startOf()
                .fromNow()}
            </h6>
            <p className="card-text">{this.props.news.synopsis}</p>
            <a href={this.props.news.url} className="card-link">
              {this.props.news.url}
            </a>
            <p />
            <p>
            <button
              className="size1button"
              onClick={() => this.props.deleteArticle(this.props.news.id)}
            >
              Delete
            </button>
            </p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ArticleBuilder;
