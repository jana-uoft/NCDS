
export const getNews = () => ({
  types: ['LOADING', 'GET_NEWS_SUCCESS', 'GET_NEWS_FAILED'],
  payload: {
    request:{
      url: '/news',
      method: 'GET'
    }
  }
})

export const getLatestRSSNews = () => ({
  types: ['LOADING', 'GET_NEWS_RSS_SUCCESS', 'GET_NEWS_RSS_FAILED'],
  payload: {
    request:{
      url: '/news/rss',
      method: 'GET'
    }
  }
})

export const updateNews = news => {
  const id = news._id
  delete news['_id']
  delete news['__v']
  return {
    types: ['LOADING', 'UPDATE_NEWS_SUCCESS', 'UPDATE_NEWS_FAILED'],
    payload: {
      request:{
        url: `/news/${id}`,
        method: 'PUT',
        data: news
      }
    },
    success: 'News updated successfully',
  }
}

export const createNews = news => {
  return {
    types: ['LOADING', 'CREATE_NEWS_SUCCESS', 'CREATE_NEWS_FAILED'],
    payload: {
      request:{
        url: `/news`,
        method: 'POST',
        data: news
      }
    },
    success: 'News created successfully',
  }
}

export const deleteNews = newsID => {
  return {
    types: ['LOADING', 'DELETE_NEWS_SUCCESS', 'DELETE_NEWS_FAILED'],
    payload: {
      request:{
        url: `/news/${newsID}`,
        method: 'DELETE'
      }
    },
    success: 'News deleted successfully',
  }
}