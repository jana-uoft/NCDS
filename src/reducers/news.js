const news = (state = [], action) => {
  let news, newsIndex;
  switch (action.type) {
    case 'GET_NEWS_SUCCESS':
      return [...action.payload.data]
    case 'UPDATE_NEWS_SUCCESS':
      newsIndex = state.findIndex(news=>news._id===action.payload.data._id)
      news = [...state]
      news.splice(newsIndex, 1, {...action.payload.data})
      return news
    case 'CREATE_NEWS_SUCCESS':
      return [{...action.payload.data}, ...state]
    case 'DELETE_NEWS_SUCCESS':
      newsIndex = state.findIndex(news=>news._id===action.payload.data._id)
      news = [...state]
      news.splice(newsIndex, 1)
      return news
    default:
      return state
  }
}

export default news