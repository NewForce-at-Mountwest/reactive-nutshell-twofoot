import React, { Component } from "react";
import {Link} from "react-router-dom"
import apiManager from "./apiManager";
var moment = require("moment");
var test = Date.now();

class ArticleBuilder extends Component {
  state = {
    news: this.props.news
  };

  articleDelete(){
    apiManager.
  }

  componentDidMount() {}
  render() {
    return (
      <div className="card news">
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
        </div>
        <p className="" onClick={this.articleDelete}>
          <Link
            className="fas fa-trash size2button color-white"
            style={{ textDecoration: "none" }}
            to="/"
          > Delete</Link>
        </p>
      </div>
    );
  }
}

export default ArticleBuilder;
