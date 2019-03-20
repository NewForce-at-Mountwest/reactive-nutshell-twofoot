import React, { Component } from "react";
import ArticleBuilder from "./articleBuilder";
import { Link } from "react-router-dom"

class ArticleList extends Component {
  state = {};

  render() {
    return (
      <div className="newsDivHeader">
        <h1>News</h1>
        <hr className="my-4" />
        <p className="">
          <Link
            className="far fa-plus-square size2button color-white"
            style={{ textDecoration: "none" }}
            to="/create-article"
          > New Article</Link>
        </p>
          <div className="newsDiv">
            {this.props.news.map(news => (

              <ArticleBuilder {...this.props} deleteArticle={this.props.deleteArticle}  key={news.id} news={news} />

            ))}
          </div>
      </div>
    );
  }
}

export default ArticleList;