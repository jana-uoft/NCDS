import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import Loading from '../../components/global/Loading';
import UnsavedConfirmation from '../../components/admin/UnsavedConfirmation';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { getNews, createNews, updateNews, deleteNews } from '../../actions/news';

const isValidURL = (str) => {
  var a = document.createElement('a');
  a.href = str;
  const result = (a.host && a.host !== window.location.host) || !str;
  a.remove();
  return result;
}

const newNews = {
  "title": "",
  "link": "",
  "category": "",
  "rss": ""
}

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedNews: null,
      editMode: false,
      unsavedConfirmation: false,
      deleteConfirmation: false,
      lastEditedField: null,
      rssValidationError: ''
    }
  }

  componentDidMount = () => {
    this.props.getNews()
    .then(()=>{
      if (this.props.news.length===0)
        this.setState({selectedNews: {...newNews}, editMode: true})
      else
        this.setState({selectedNews: this.props.news[0]})
    })
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!isEqual(prevProps.news, this.props.news)) {
      if (prevState.selectedNews && prevState.selectedNews.hasOwnProperty('_id')) {
        const selectedNewsID = prevState.selectedNews._id
        const updatedSelectedNews = this.props.news.find(news=>news._id===selectedNewsID)
        this.setState({selectedNews: {...updatedSelectedNews}})
      }
    }
  }

  handleTextChange = (field, value) => {
    this.setState({selectedNews: {...this.state.selectedNews, [field]: value }, lastEditedField: field})
  }

  handleDateChange = (field, date) => {
    this.setState({selectedNews: {...this.state.selectedNews, [field]: date.toISOString() }, lastEditedField: field})
  }

  selectNews = (selectedNews) => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.saveNews()
        this.setState({selectedNews, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedNews, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedNews, editMode: false, lastEditedField: null})
    }
  }


  unsavedConfirmationSave = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationDiscard = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationCancel = () => this.setState({unsavedConfirmation: false})

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  addNewNews = () => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.setState({selectedNews: {...newNews}, editMode: true, unsavedConfirmation: false}, ()=>this.saveNews())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedNews: {...newNews}, editMode: true, unsavedConfirmation: false})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedNews: {...newNews}, editMode: true})
    }
  }

  cancelNewNews = () => {
    const editMode = this.props.news.length===0
    const selectedNews = this.props.news.length===0 ? {...newNews} : this.props.news[0]
    if (this.state.editMode && this.state.lastEditedField) {
      this.unsavedConfirmationSave = () => {
        this.setState({selectedNews, editMode, unsavedConfirmation: false, lastEditedField: null}, ()=>this.saveNews())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedNews, editMode, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedNews, editMode, lastEditedField: null})
    }
  }


  deleteNews = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteNews(this.state.selectedNews._id)
        .then(()=>{
          if (this.props.news.length===0)
            this.setState({selectedNews: {...newNews}, lastEditedField: null, editMode: true})
          else
            this.setState({selectedNews: this.props.news[0], lastEditedField: null, editMode: false})
        })
      })
    }
    this.setState({deleteConfirmation: true})
  }

  toggleEditMode = (news) => {
    if (this.state.editMode){
      if (this.state.lastEditedField)
        this.saveNews();
      this.setState({editMode: false})
    } else {
      if (!isEqual(this.state.selectedNews, news))
        this.setState({editMode: true, selectedNews: {...news}})
      else
        this.setState({editMode: true})
    }
  }

  saveNews = () => {
    if (this.state.selectedNews.hasOwnProperty('_id')){
      this.props.updateNews({...this.state.selectedNews})
      .then((response)=>{
        if (response.hasOwnProperty('error'))
          this.setState({rssValidationError: 'Invalid RSS feed link', editMode: true})
        else
          this.setState({editMode: false, lastEditedField: null, rssValidationError: ''})
      })
    } else {
      this.props.createNews(this.state.selectedNews)
      .then((response)=>{
        if (response.hasOwnProperty('error'))
          this.setState({rssValidationError: 'Invalid RSS feed link', editMode: true})
        else
          this.setState({editMode: false, selectedNews: this.props.news[0], lastEditedField: null, rssValidationError: ''})
      })
    }
  }

  checkValidation = () => {
    const titleEmpty = this.state.selectedNews.title==="";
    const categoryEmpty = this.state.selectedNews.category==="";
    const linkEmpty = this.state.selectedNews.link==="";
    const linkIsValid = isValidURL(this.state.selectedNews.link);
    const rssIsValid = isValidURL(this.state.selectedNews.rss);
    return titleEmpty || categoryEmpty || linkEmpty || !linkIsValid || !rssIsValid;
  }


  renderNews = () => {
    return (
      <Paper
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center'
        }}
      >
          <div style={{
            display: 'grid',
            gridGap: 20,
            gridTemplateColumns: '1fr 3fr',
            alignItems: 'center'
          }}>
            <div style={{padding: 20, justifySelf: 'center'}}>
              <Typography variant='subheading'>Title</Typography>
            </div>
            <TextField
              id={this.state.selectedNews._id}
              onChange={(e)=>this.handleTextChange('title', e.target.value)}
              value={this.state.selectedNews.title}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedNews.title===""}
              helperText={this.state.selectedNews.title==="" ? "Required" : null}
            />
          </div>
          <div style={{
            display: 'grid',
            gridGap: 20,
            gridTemplateColumns: '1fr 3fr',
            alignItems: 'center'
          }}>
            <div style={{padding: 20, justifySelf: 'center'}}>
              <Typography variant='subheading'>Category</Typography>
            </div>
            <TextField
              id={this.state.selectedNews._id}
              onChange={(e)=>this.handleTextChange('category', e.target.value)}
              value={this.state.selectedNews.category}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedNews.category===""}
              helperText={this.state.selectedNews.category==="" ? "Required" : null}
            />
          </div>
          <div style={{
            display: 'grid',
            gridGap: 20,
            gridTemplateColumns: '1fr 3fr',
            alignItems: 'center'
          }}>
            <div style={{padding: 20, justifySelf: 'center'}}>
              <Typography variant='subheading'>External Link</Typography>
            </div>
            <TextField
              id={this.state.selectedNews._id}
              onChange={(e)=>this.handleTextChange('link', e.target.value)}
              value={this.state.selectedNews.link}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedNews.link==="" || !isValidURL(this.state.selectedNews.link)}
              helperText={this.state.selectedNews.link==="" || !isValidURL(this.state.selectedNews.link) ? "Required or Invalid URL" : null}
            />
          </div>
          <div style={{
            display: 'grid',
            gridGap: 20,
            gridTemplateColumns: '1fr 3fr',
            alignItems: 'center'
          }}>
            <div style={{padding: 20, justifySelf: 'center'}}>
              <Typography variant='subheading'>RSS Feed Link</Typography>
            </div>
            <TextField
              id={this.state.selectedNews._id}
              onChange={(e)=>this.handleTextChange('rss', e.target.value)}
              value={this.state.selectedNews.rss}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              error={this.state.rssValidationError!=="" || !isValidURL(this.state.selectedNews.rss)}
              helperText={this.state.rssValidationError!=="" || !isValidURL(this.state.selectedNews.rss) ? "Invalid RSS feed link" : null}
            />
          </div>
          <br/>
      </Paper>
    )
  }

  checkIfCurrentNews = news => this.state.selectedNews && this.state.selectedNews._id===news._id
  checkIfNotCurrentNews = news => this.state.selectedNews && this.state.selectedNews._id!==news._id

  render() {

    return (
      <div>
        {this.props.loading && <Loading />}
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <div>
            {this.state.selectedNews && this.state.selectedNews.hasOwnProperty('_id') &&
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || (this.state.selectedNews && !this.state.selectedNews.hasOwnProperty('_id'))}
                onClick={this.addNewNews}
                fullWidth
              >
                Create New News
              </Button>
            }
            {this.state.selectedNews && !this.state.selectedNews.hasOwnProperty('_id') &&
              <div style={{
                display: 'grid',
                gridGap: 20,
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                alignItems: 'center'
              }}>
                <Button
                  color="secondary"
                  disabled={this.props.loading}
                  onClick={this.cancelNewNews}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.props.loading || this.checkValidation()}
                  onClick={this.saveNews}
                >
                  Save
                </Button>
              </div>
            }
              <br/>
              <br/>
              <List style={{height: '82vh', overflowY: 'scroll'}}>
              {this.props.news.map((news, idx)=>
                <ListItem
                  key={idx}
                  button
                  onClick={()=>!this.checkIfCurrentNews(news) && this.selectNews(news)}
                  style={this.checkIfCurrentNews(news) ? {background: '#a18be6'} : {}}
                  disabled={this.props.loading}
                >
                  <ListItemText
                    secondary={
                      <Typography
                      variant="body2"
                      style={this.checkIfCurrentNews(news) ? {color: 'white'} : {}}
                    >
                      {news.category}
                    </Typography>
                    }
                    primary={
                      <Typography
                        variant="subheading"
                        style={this.checkIfCurrentNews(news) ? {color: 'white'} : {}}
                      >
                        {news.title.length > 30 ? news.title.slice(0, 30)+'...' : news.title}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Toggle Edit/Save"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentNews(news) || (this.checkIfCurrentNews(news) && this.checkValidation()))}
                      onClick={()=>this.toggleEditMode(news)}
                      color='primary'
                    >
                      {this.state.editMode && this.checkIfCurrentNews(news) ? <SaveIcon/> : <EditIcon/>}
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentNews(news))}
                      onClick={this.deleteNews}
                      color='secondary'
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
          {this.state.selectedNews && Object.keys(this.state.selectedNews).length !== 0 && this.renderNews()}
        </div>
        <UnsavedConfirmation
          open={this.state.unsavedConfirmation}
          confirmationSave={this.unsavedConfirmationSave}
          confirmationCancel={this.unsavedConfirmationCancel}
          confirmationDiscard={this.unsavedConfirmationDiscard}
          disabled={this.state.selectedNews && this.checkValidation()}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
          disabled={this.state.selectedNews && this.checkValidation()}
        />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.general.loading,
  news: state.news.news
})

const mapDispatchToProps = dispatch => ({
  getNews: () => dispatch(getNews()),
  createNews: news => dispatch(createNews(news)),
  updateNews: news => dispatch(updateNews(news)),
  deleteNews: newsID => dispatch(deleteNews(newsID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)