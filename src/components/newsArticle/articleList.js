import React, { Component } from "react";
import ArticleBuilder from "./articleBuilder";
import { Link } from "react-router-dom";

class ArticleList extends Component {
  state = {};

  render() {
    return (
      <div>
        <h2 className="">News Articles</h2>
        <hr className="my-4" />
          <div className="newsDiv">
            {this.props.news.map(news => (
              <ArticleBuilder key={news.id} news={news} />
            ))}
          </div>
      </div>
    );
  }
}

export default ArticleList;