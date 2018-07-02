import News from '../models/newsModel';
import feedparser from 'feedparser-promised';


const validateRSSFeed = async (rss) => {
  let result = true;
  if (rss) {
    try {
      result = await feedparser.parse(rss);
      result.map(news => {
        news.image.url;
        news.guid;
        news.title;
        news.date;
      })
    } catch (err) {
      result = false;
    }
  }
  return result;
}

export async function list(req, res, next) {
  const news = await News.find({}, null, { sort: { title: -1 } });
  res.status(200).json([...news]);
}

export async function retrieve(req, res, next) {
  const id = req.params.id;
  const news = await News.findById(id);
  if (!news)
    return res.status(404).json({ error: `News with id ${id} was not found` });
  res.status(200).json({ ...news['_doc'] });
}

export async function create(req, res, next) {
  const isRssValid = await validateRSSFeed(req.value.body.rss);
  if (!isRssValid)
    return res.status(422).json({ error: 'Invalid RSS feed' });
  const news = await new News(req.value.body).save();
  res.status(201).json({ ...news['_doc'] });
}

export async function update(req, res, next) {
  const id = req.params.id;
  const updatedNews = req.value.body;
  const isRssValid = await validateRSSFeed(updatedNews.rss);
  if (!isRssValid)
    return res.status(422).json({ error: 'Invalid RSS feed' });
  News.findByIdAndUpdate(id, updatedNews, (error, news) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!news)
      return res.status(404).json({ error: `News with id ${id} was not found` });
    else
      return res.status(200).json({ ...news['_doc'], ...updatedNews });
  });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  News.findByIdAndRemove(id, (error, news) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!news)
      return res.status(404).json({ error: `News with id ${id} was not found` });
    else
      return res.status(200).json({...news['_doc']});
  });
}