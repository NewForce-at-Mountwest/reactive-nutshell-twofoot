import React, { Component } from "react";

class ArticleBuilder extends Component {
  state = {
    news: this.props.news
  };

  componentDidMount() {}
  render() {
    return (
<div className="card news" >
 <div className="card-body">
   <h5 className="card-title">{this.props.news.title}</h5>
   <h6 className="card-subtitle mb-2 text-muted">{this.props.news.timestamp}</h6>
   <p className="card-text">{this.props.news.synopsis}</p>
   <a href="{this.props.news.url}" className="card-link">{this.props.news.url}</a>
 </div>
 </div>
    );
  }
}

export default ArticleBuilder;
