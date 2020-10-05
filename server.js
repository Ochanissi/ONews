const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const knex = require('knex');
const compression = require('compression');
const enforce = require('express-sslify');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
// const multer = require('multer');
// const sharp = require('sharp');

const news = require('./controllers/news');
const search = require('./controllers/search');
const signUp = require('./controllers/sign-up');
const signIn = require('./controllers/sign-in');
const profile = require('./controllers/profile');
const saved = require('./controllers/saved');
const liked = require('./controllers/liked');
const disliked = require('./controllers/disliked');
const hidden = require('./controllers/hidden');
const searches = require('./controllers/searches');

// App initialization
const app = express();
const port = process.env.PORT || process.env.ONEWS_PORT || 5008;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/.env' });

  // Development logging
  app.use(morgan('dev'));
}

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.ONEWS_DB_HOST,
    user: process.env.ONEWS_DB_USER,
    password: process.env.ONEWS_DB_PASSWORD,
    database: process.env.ONEWS_DB_NAME,
  },
});

// Set security HTTP headers
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  // Serving static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

// app.use(express.static('./public'));

app.post('/news', (req, res) => {
  news.handleGetNews(req, res);
});

app.post('/search', (req, res) => {
  search.handleGetSearch(req, res);
});

app.post('/sign-in', (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

app.post('/sign-up', (req, res) => {
  signUp.handleSignUp(req, res, db, bcrypt);
});

// User Profile
app.get('/profile/:id', (req, res) => {
  profile.handleGetProfile(req, res, db);
});

app.patch('/profile', (req, res) => {
  profile.handlePatchProfile(req, res, db);
});

// User Saved
app.post('/post-saved', (req, res) => {
  saved.handlePostSaved(req, res, db);
});

app.post('/get-saved', (req, res) => {
  saved.handleGetSaved(req, res, db);
});

app.post('/delete-saved', (req, res) => {
  saved.handleDeleteSaved(req, res, db);
});

// User Liked
app.post('/post-liked', (req, res) => {
  liked.handlePostLiked(req, res, db);
});

app.post('/get-liked', (req, res) => {
  liked.handleGetLiked(req, res, db);
});

app.post('/delete-liked', (req, res) => {
  liked.handleDeleteLiked(req, res, db);
});

// User Disliked
app.post('/post-disliked', (req, res) => {
  disliked.handlePostDisliked(req, res, db);
});

app.post('/get-disliked', (req, res) => {
  disliked.handleGetDisliked(req, res, db);
});

app.post('/delete-disliked', (req, res) => {
  disliked.handleDeleteDisliked(req, res, db);
});

// User Hidden
app.post('/post-hidden', (req, res) => {
  hidden.handlePostHidden(req, res, db);
});

app.post('/get-hidden', (req, res) => {
  hidden.handleGetHidden(req, res, db);
});

app.post('/delete-hidden', (req, res) => {
  hidden.handleDeleteHidden(req, res, db);
});

// User Searches
app.post('/post-searches', (req, res) => {
  searches.handlePostSearches(req, res, db);
});

app.post('/get-searches', (req, res) => {
  searches.handleGetSearches(req, res, db);
});

app.post('/delete-searches', (req, res) => {
  searches.handleDeleteSearches(req, res, db);
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
