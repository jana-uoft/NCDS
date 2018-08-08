import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNews, getLatestRSSNews } from '../../actions/news';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../../components/global/Loading';


class News extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }


  componentDidMount() {
    this.props.getNews()
    this.props.getLatestRSSNews()
  }

  render() {
    const PageGrid = styled.div`
      display: grid;
      grid-template-columns: 5fr 2fr;
      grid-gap: 20px;
      margin: 20px 20px;
      @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `

    const RSS = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 10px;
    `

    const RSSCard = styled(Paper)`
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%);
      .title {
        color: white;
      }
      cursor: pointer;
      text-align: center;
      img {
        max-height: 150px;
        width: 100%;
      }
      &:hover {
        background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(23,50,29,1) 38%);
      }
    `

    const NewsCategory = styled(Paper)`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      grid-gap: 10px;
      padding: 20px 20px;
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%);
    `

    const NewsChip = styled(Chip)`
      &:hover{
        background: linear-gradient(90deg, rgba(21,131,21,1) 0%, rgba(3,17,10,1) 100%);
        color: white;
      }
    `

    let newsByCategory = {};
    this.props.news.forEach(news=>{
      if (newsByCategory.hasOwnProperty(news.category)) newsByCategory[news.category].push(news)
      else newsByCategory[news.category] = [news]
    })
    return (
      <PageGrid>
        {this.props.loading && <Loading />}
        <RSS>
          {this.props.rss.map((rss, idx)=>
            <RSSCard key={idx} onClick={()=>window.open(rss.guid, '_blank')}>
              <img src={rss.image} alt={rss.title}/>
              <Typography className="title" variant="body2"><b>{rss.title}</b></Typography>
            </RSSCard>
          )}
        </RSS>
        <div>
          {Object.keys(newsByCategory).map((category, idx)=>
            <Paper key={idx} style={{textAlign: 'center', marginBottom: 20, background: 'radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%)'}}>
              <Typography variant="subheading" style={{color: 'white'}}>{category}</Typography>
              <NewsCategory>
                {this.props.news.map((news, idx) => {
                  if (category!==news.category) return null
                  return (
                    <NewsChip
                      key={idx}
                      label={news.title}
                      clickable
                      onClick={()=>window.open(news.link, '_blank')}
                      avatar={<Avatar src={`https://www.google.com/s2/favicons?domain=${news.link}`} />}
                    />
                  )
                })}
              </NewsCategory>
            </Paper>
          )}
        </div>
      </PageGrid>
    )
  }
}


const mapStateToProps = state => ({
  news: state.news.news,
  rss: state.news.rss,
  lastUpdated: state.news.lastUpdated,
  loading: state.general.loading
})

const mapDispatchToProps = dispatch => ({
  getNews: () => dispatch(getNews()),
  getLatestRSSNews: () => dispatch(getLatestRSSNews())
})

export default connect(mapStateToProps, mapDispatchToProps)(News)

