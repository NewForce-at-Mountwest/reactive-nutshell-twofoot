const apiManager = {
    user: () =>
      fetch(`http://localhost:8080/news`).then(news =>
        news.json()
      )
}

export default apiManager;