const apiManager = {
  news: () =>
    fetch(`http://localhost:8080/news?_expand=user`).then(news => news.json()),
  createArticle: createArticle => {
    fetch(`http://localhost:8080/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createArticle)
    });
  },
  articleDelete: () => {
    fetch(`http://localhost:8080/news`, {
      method: "Delete"
    });
  }
};

export default apiManager;
