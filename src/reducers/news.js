const initialState = {
  news: [],
  rss: [],
  lastUpdated: null,
}

const news = (state = initialState, action) => {
  let news, newsIndex;
  switch (action.type) {
    case 'GET_NEWS_SUCCESS':
      return {...state, news:[...action.payload.data]}
    case 'GET_NEWS_RSS_SUCCESS':
      return {...state, rss:[...action.payload.data], lastUpdated: new Date()}
    case 'UPDATE_NEWS_SUCCESS':
      newsIndex = state.news.findIndex(news=>news._id===action.payload.data._id)
      news = [...state.news]
      news.splice(newsIndex, 1, {...action.payload.data})
      return {...state, news}
    case 'CREATE_NEWS_SUCCESS':
      return {...state, news:[{...action.payload.data}, ...state.news]}
    case 'DELETE_NEWS_SUCCESS':
      newsIndex = state.news.findIndex(news=>news._id===action.payload.data._id)
      news = [...state.news]
      news.splice(newsIndex, 1)
      return {...state, news}
    default:
      return state
  }
}

export default news