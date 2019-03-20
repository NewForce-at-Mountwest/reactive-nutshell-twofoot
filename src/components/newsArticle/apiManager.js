const apiManager = {
  news: () =>
    fetch(`http://localhost:5002/news?_expand=user`).then(news => news.json()),
  createArticle: createArticle => {
    fetch(`http://localhost:5002/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createArticle)
    })
  },
  deleteArticle: id => {
    fetch(`http://localhost:5002/news/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/news?_expand=user`))
      .then(news => news.json())
  }
};

export default apiManager;
