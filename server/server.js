import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import contributionRoutes from './routes/contributionRoutes';
import publicationRoutes from './routes/publicationRoutes';
import galleryRoutes from './routes/galleryRoutes';
import eventRoutes from './routes/eventRoutes';
import obituaryRoutes from './routes/obituaryRoutes';
import cloudinaryRoutes from './routes/cloudinaryRoutes';


// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
// const feedparser = require('feedparser-promised');
// var nodemailer = require('nodemailer');


// config = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));

// cloudinary.config({
//   cloud_name: config.cloudinary_name,
//   api_key: config.cloudinary_api_key,
//   api_secret: config.cloudinary_api_secret,
// });

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: config.admin_email_user,
//     pass: config.admin_email_pass
//   }
// });

// const baseURL = 'https://res.cloudinary.com/nainativucds/raw/upload/';

const app = express();

// MongoDB
mongoose.connect('mongodb://localhost/ncds');
mongoose.Promise = global.Promise;

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/obituaries', obituaryRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);

// Catch 404 Errors
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : { message: "Something went wrong. We're working on it."};
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

// Serve ReactJS at '/' url
app.use('/', express.static(`../build`));
app.get('*', function (req, res) {
  res.sendFile('index.html');
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



// app.get('/api/publications', (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "publications/", max_results: 500 }, function (error, result) {
//     if (error) result = JSON.parse(fs.readFileSync('./data/publications.json', 'utf8'));
//     else fs.writeFileSync('./data/publications.json', JSON.stringify(result, null, 4));
//     let response = {};
//     result.resources.forEach(resource => {
//       let date = resource.public_id.split('/', 3)[1];
//       if (date in response) response[date].push(resource.public_id)
//       else response[date] = [resource.public_id]
//     });
//     let responseArray = [];
//     Object.entries(response).forEach(([publication, images]) => {
//       responseArray.push({ publication: publication, images})
//     });
//     responseArray.sort(((a, b) => Date.parse(b.publication) - Date.parse(a.publication)));
//     res.send(responseArray);
//   })
// });



// app.get('/api/gallery', (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "gallery/", max_results: 500 }, function (error, result) {
//     if (error) result = JSON.parse(fs.readFileSync('./data/gallery.json', 'utf8'));
//     else fs.writeFileSync('./data/gallery.json', JSON.stringify(result, null, 4));
//     let response = {};
//     result.resources.forEach(resource => {
//       let eventName = resource.public_id.split('/', 3)[1];
//       if (eventName in response) response[eventName].push(resource.public_id)
//       else response[eventName] = [resource.public_id]
//     });
//     let responseArray = [];
//     Object.entries(response).forEach(([event, images]) => {
//       try{
//         details = JSON.parse(fs.readFileSync('./data/gallery/' + event + '/details.json', 'utf8'));
//       }catch(err) {
//         details = JSON.parse(fs.readFileSync('./data/details.json', 'utf8'));
//       }
//       responseArray.push({ event, images, details })
//     });
//     responseArray.sort(((a, b) => Date.parse(b.details.date) - Date.parse(a.details.date)));
//     res.send(responseArray);
//   })
// });



// app.get('/api/events', (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "events/", max_results: 500 }, function (error, result) {
//     if (error) result = JSON.parse(fs.readFileSync('./data/events.json', 'utf8'));
//     else fs.writeFileSync('./data/events.json', JSON.stringify(result, null, 4));
//     let response = {};
//     result.resources.forEach(resource => {
//       let eventName = resource.public_id.split('/', 3)[1];
//       if (eventName in response) response[eventName].push(resource.public_id)
//       else response[eventName] = [resource.public_id]
//     });
//     let responseArray = [];
//     Object.entries(response).forEach(([event, images]) => {
//       try{
//       details = JSON.parse(fs.readFileSync('./data/events/' + event + '/details.json', 'utf8'));
//     }catch (err) {
//       details = JSON.parse(fs.readFileSync('./data/details.json', 'utf8'));
//     }
//       responseArray.push({ event, images, details })
//     });
//     responseArray.sort(((a, b) => Date.parse(b.details.date) - Date.parse(a.details.date)));
//     res.send(responseArray);
//   })
// });


// app.get('/api/obituary', (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "obituary/", max_results: 500 }, function (error, result) {
//     if (error) result = JSON.parse(fs.readFileSync('./data/obituary.json', 'utf8'));
//     else fs.writeFileSync('./data/obituary.json', JSON.stringify(result, null, 4));
//     let response = {};
//     result.resources.forEach(resource => {
//       let eventName = resource.public_id.split('/', 3)[1];
//       if (eventName in response) response[eventName].push(resource.public_id)
//       else response[eventName] = [resource.public_id]
//     });
//     let responseArray = [];
//     Object.entries(response).forEach(([event, images]) => {
//       try{
//       details = JSON.parse(fs.readFileSync('./data/obituary/' + event + '/details.json', 'utf8'));
//     }catch (err) {
//       details = JSON.parse(fs.readFileSync('./data/details.json', 'utf8'));
//     }
//       responseArray.push({ event, images, details })
//     });
//     responseArray.sort(((a, b) => Date.parse(b.details.death_date) - Date.parse(a.details.death_date)));
//     res.send(responseArray);
//   })
// });

// app.get('/api/contributions', (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "contributions/", max_results: 500 }, function (error, result) {
//     if (error) result = JSON.parse(fs.readFileSync('./data/contributions.json', 'utf8'));
//     else fs.writeFileSync('./data/obituary.json', JSON.stringify(result, null, 4));
//     let response = {};
//     result.resources.forEach(resource => {
//       let eventName = resource.public_id.split('/', 3)[1];
//       if (eventName in response) response[eventName].push(resource.public_id)
//       else response[eventName] = [resource.public_id]
//     });
//     let responseArray = [];
//     Object.entries(response).forEach(([event, images]) => {
//       try{
//       details = JSON.parse(fs.readFileSync('./data/contributions/' + event + '/details.json', 'utf8'));
//     }catch (err) {
//       details = JSON.parse(fs.readFileSync('./data/details.json', 'utf8'));
//     }
//       responseArray.push({ event, images, details })
//     });
//     responseArray.sort(((a, b) => Date.parse(b.details.date) - Date.parse(a.details.date)));
//     res.send(responseArray);
//   })
// });


// app.get('/api/gallery/:name', async (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "gallery/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
//     JSON.parse(fs.readFileSync('./data/gallery/' + req.params.name + '/details.json', 'utf8'));
//     fetch(result.resources[0].secure_url)
//       .then(response => response.json())
//       .then(details => res.send(details))
//   })
// });



// app.get('/api/events/:name', async (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "events/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
//     JSON.parse(fs.readFileSync('./data/events/' + req.params.name + '/details.json', 'utf8'));
//     fetch(result.resources[0].secure_url)
//       .then(response => response.json())
//       .then(details => res.send(details))
//   })
// });


// app.get('/api/contributions/:name', async (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "contributions/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
//     JSON.parse(fs.readFileSync('./data/contributions/' + req.params.name + '/details.json', 'utf8'));
//     fetch(encodeURI(result.resources[0].secure_url))
//       .then(response => response.json())
//       .then(details => res.send(details))
//   })
// });


// app.get('/api/obituary/:name', async (req, res) => {
//   cloudinary.api.resources({ type: "upload", prefix: "obituary/" + req.params.name, max_results: 500, resource_type: 'raw' }, function (error, result) {
//     JSON.parse(fs.readFileSync('./data/obituary/' + req.params.name + '/details.json', 'utf8'));
//     fetch(result.resources[0].secure_url)
//       .then(response => response.json())
//       .then(details => res.send(details))
//   })
// });


// app.get('/api/deleteDerived', (req, res) => {
//   cloudinary.api.delete_all_resources({ keep_original: true }, function (error, result) {
//     if (error) res.send(error);
//     else res.send(result);
//   });
// });

// app.get('/api/news', (req, res) => {
//   result = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));
//   res.send(shuffle(result));
// });

// app.get('/api/updateNews', (req, res) => {
//   const news_channels = [
//     'http://www.jvpnews.com/rss.xml',
//     'http://news.lankasri.com/rss.xml',
//     'http://www.canadamirror.com/rss.xml',
//     'http://www.tamilwin.com/rss.xml',
//     'http://www.cineulagam.com/rss.xml',
//     'http://www.manithan.com/rss.xml'
//   ];
//   let promises = [];
//   for (var channel of news_channels) {
//     promises.push(feedparser.parse(channel));
//   }
//   Promise.all(promises)
//     .then((items) => {
//       try {
//         var allNews = Array.prototype.concat.apply([], items);
//         fs.writeFileSync('./data/news.json', JSON.stringify(allNews, null, 4));
//         res.send({ success: allNews });
//       } catch (err) {
//         res.send(err);
//       }
//     })
//     .catch((e) => {
//       res.send(e);
//     });
// });







// app.post('/api/mail', (req, res) => {
//   let html = '<h1> Message from NainativuCDS.org </h1>';
//   html += '<p>' + req.body.message + '</p>';
//   if (req.body.hasOwnProperty('name')) html += '<br/><br/><p> Name: ' + req.body.name + '</p>';
//   if (req.body.hasOwnProperty('email')) html += '<br/><p> Email: ' + req.body.email + '</p>';
//   if (req.body.hasOwnProperty('phone')) html += '<br/><p> Contact No: ' + req.body.phone + '</p>';
//   var mailOptions = {
//     from: 'admin@nainativucds.org',
//     to: 'admin@nainativucds.org',
//     subject: req.body.subject,
//     html
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       res.send({ result: error });
//       console.log(error);
//     } else {
//       res.send({ result: info.response });
//       console.log('Email sent: ' + info.response);
//     }
//   });
// });







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
