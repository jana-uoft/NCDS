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
import newsRoutes from './routes/newsRoutes';
import messageRoutes from './routes/messageRoutes';
import cloudinaryRoutes from './routes/cloudinaryRoutes';

const app = express();

// MongoDB
mongoose.connect(process.env.MONGO_DB);
mongoose.Promise = global.Promise;

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '1000mb'}));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/obituaries', obituaryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);


// Serve ReactJS at '/' url
const path = require('path');
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
  res.sendFile('index.html');
});

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

// Start the server
const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
