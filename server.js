const fetch  = require("isomorphic-fetch");

const express = require('express');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const feedparser = require('feedparser-promised');


config = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const baseURL = 'https://res.cloudinary.com/nainativucds/raw/upload/';

const app = express();
const port = process.env.PORT || 5000;


app.use('/', express.static(`${__dirname}/client/build`));


app.get('/api/publications', (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "publications/", max_results: 500 }, function (error, result) { 
    if (error) result = JSON.parse(fs.readFileSync('./data/publications.json', 'utf8'));
    else fs.writeFileSync('./data/publications.json', JSON.stringify(result, null, 4));
    let response = {};
    result.resources.forEach(resource => {
      let date = resource.public_id.split('/', 3)[1];
      if (date in response) response[date].push(resource.public_id)
      else response[date] = [resource.public_id]
    });
    let responseArray = [];
    Object.entries(response).forEach(([publication, images]) => {
      responseArray.push({ publication: publication, images})
    });
    responseArray.sort(((a, b) => Date.parse(b.publication) - Date.parse(a.publication)));
    res.send(responseArray);    
  })
});



app.get('/api/gallery', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "gallery/", max_results: 500 }, function (error, result) {
    if (error) result = JSON.parse(fs.readFileSync('./data/gallery.json', 'utf8'));
    else fs.writeFileSync('./data/gallery.json', JSON.stringify(result, null, 4));
    let response = {};
    result.resources.forEach(resource => {
      let eventName = resource.public_id.split('/', 3)[1];
      if (eventName in response) response[eventName].push(resource.public_id)
      else response[eventName] = [resource.public_id]
    });
    let responseArray = [];
    Object.entries(response).forEach(([event, images]) => {
      responseArray.push({ event, images })
    });
    res.send(responseArray);
  })
});



app.get('/api/events', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "events/", max_results: 500 }, function (error, result) {
    if (error) result = JSON.parse(fs.readFileSync('./data/events.json', 'utf8'));
    else fs.writeFileSync('./data/events.json', JSON.stringify(result, null, 4));
    let response = {};
    result.resources.forEach(resource => {
      let eventName = resource.public_id.split('/', 3)[1];
      if (eventName in response) response[eventName].push(resource.public_id)
      else response[eventName] = [resource.public_id]
    });
    let responseArray = [];
    Object.entries(response).forEach(([event, images]) => {
      responseArray.push({ event, images })
    });
    res.send(responseArray);
  })
});


app.get('/api/obituary', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "obituary/", max_results: 500 }, function (error, result) {
    if (error) result = JSON.parse(fs.readFileSync('./data/obituary.json', 'utf8'));
    else fs.writeFileSync('./data/obituary.json', JSON.stringify(result, null, 4));
    let response = {};
    result.resources.forEach(resource => {
      let eventName = resource.public_id.split('/', 3)[1];
      if (eventName in response) response[eventName].push(resource.public_id)
      else response[eventName] = [resource.public_id]
    });
    let responseArray = [];
    Object.entries(response).forEach(([event, images]) => {
      responseArray.push({ event, images })
    });
    res.send(responseArray);
  })
});

app.get('/api/contributions', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "contributions/", max_results: 500 }, function (error, result) {
    if (error) result = JSON.parse(fs.readFileSync('./data/contributions.json', 'utf8'));
    else fs.writeFileSync('./data/obituary.json', JSON.stringify(result, null, 4));
    let response = {};
    result.resources.forEach(resource => {
      let eventName = resource.public_id.split('/', 3)[1];
      if (eventName in response) response[eventName].push(resource.public_id)
      else response[eventName] = [resource.public_id]
    });
    let responseArray = [];
    Object.entries(response).forEach(([event, images]) => {
      responseArray.push({ event, images })
    });
    res.send(responseArray);
  })
});


app.get('/api/gallery/:name', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "gallery/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
    if (result.rate_limit_remaining < 50) {
      if (error) result = JSON.parse(fs.readFileSync('./data/gallery/' + req.params.name + '.json', 'utf8'));
      else fs.writeFileSync('./data/gallery/' + req.params.name + '.json', JSON.stringify(result, null, 4));
    }
    fetch(result.resources[0].secure_url)
      .then(response => response.json())
      .then(details => res.send(details))
  })
});



app.get('/api/events/:name', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "events/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
    if (result.rate_limit_remaining < 50) {
      if (error) result = JSON.parse(fs.readFileSync('./data/events/' + req.params.name + '.json', 'utf8'));
      else fs.writeFileSync('./data/events/' + req.params.name + '.json', JSON.stringify(result, null, 4));
    }
    fetch(result.resources[0].secure_url)
      .then(response => response.json())
      .then(details => res.send(details))
  })
});


app.get('/api/contributions/:name', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "contributions/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
    if (result.rate_limit_remaining < 50) {
      if (error) result = JSON.parse(fs.readFileSync('./data/contributions/' + req.params.name + '.json', 'utf8'));
      else fs.writeFileSync('./data/contributions/' + req.params.name + '.json', JSON.stringify(result, null, 4));
    }
    fetch(encodeURI(result.resources[0].secure_url))
      .then(response => response.json())
      .then(details => res.send(details))
  })
});


app.get('/api/obituary/:name', async (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "obituary/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
    if (result.rate_limit_remaining < 50) {
      if (error) result = JSON.parse(fs.readFileSync('./data/obituary/' + req.params.name + '.json', 'utf8'));
      else fs.writeFileSync('./data/obituary/' + req.params.name + '.json', JSON.stringify(result, null, 4));
    }
    fetch(result.resources[0].secure_url)
      .then(response => response.json())
      .then(details => res.send(details))
  })
});


app.get('/api/deleteDerived', (req, res) => {
  cloudinary.api.delete_all_resources({ keep_original: true }, function (error, result) {
    if (error) res.send(error);
    else res.send(result); 
  });
}); 

app.get('/api/news', (req, res) => {
  result = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
  res.send(shuffle(result));
}); 

app.get('/api/updateNews', (req, res) => {
  const news_channels = [
    'http://www.jvpnews.com/rss.xml',
    'http://news.lankasri.com/rss.xml',
    'http://www.canadamirror.com/rss.xml',
    'http://www.tamilwin.com/rss.xml',
    'http://www.cineulagam.com/rss.xml',
    'http://www.manithan.com/rss.xml'
  ];
  let promises = [];
  for (var channel of news_channels) {
    promises.push(feedparser.parse(channel));
  }
  Promise.all(promises)
    .then((items) => {
      try {
        var allNews = Array.prototype.concat.apply([], items);
        fs.writeFileSync('./data/news.json', JSON.stringify(allNews, null, 4));
        res.send({ success: allNews });
      } catch (err) {
        res.send(err);
      }
    })
    .catch((e) => {
      res.send(e);
    });
}); 


app.listen(port, () => console.log(`Listening on port ${port}`));


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
