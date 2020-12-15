const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const knex = require("knex");
const compression = require("compression");
const enforce = require("express-sslify");
const helmet = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan");
const multer = require("multer");
const rateLimit = require("express-rate-limit");

const news = require("./controllers/news");
const weather = require("./controllers/weather");
const search = require("./controllers/search");
const signUp = require("./controllers/sign-up");
const signIn = require("./controllers/sign-in");
const profile = require("./controllers/profile");
const saved = require("./controllers/saved");
const liked = require("./controllers/liked");
const disliked = require("./controllers/disliked");
const hidden = require("./controllers/hidden");
const searches = require("./controllers/searches");
const auth = require("./controllers/authorization");

// App initialization
const app = express();
const port = process.env.PORT || process.env.ONEWS_PORT || 5008;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });

  // Development logging
  app.use(morgan("dev"));
}

// Database
const db = knex({
  client: "pg",
  connection: {
    host: process.env.ONEWS_POSTGRES_HOST,
    user: process.env.ONEWS_POSTGRES_USER,
    password: process.env.ONEWS_POSTGRES_PASSWORD,
    database: process.env.ONEWS_POSTGRES_DB,
  },
});

// Multer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // cb(new AppError('Not an image! Please upload only images!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  dest: "uploads/",
});

// Set security HTTP headers
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(express.static("public"));

// CORS
app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  // Serving static files
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

// Limit requests from same IP
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("*", limiter);

// News
app.post("/news", (req, res) => {
  news.handleGetNews(req, res);
});

// Weather
app.post("/weather", (req, res) => {
  weather.handleGetWeather(req, res);
});

app.post("/search", (req, res) => {
  search.handleGetSearch(req, res);
});

app.post("/sign-in", (req, res) => {
  signIn.handleSignInAuth(req, res, db, bcrypt);
});

app.post("/sign-up", (req, res) => {
  signUp.handleSignUpAuth(req, res, db, bcrypt);
});

// User Profile
app.post("/profile/", auth.requireAuth, (req, res) => {
  profile.handleGetProfile(req, res, db);
});

app.patch("/profile", auth.requireAuth, (req, res) => {
  profile.handlePatchProfile(req, res, db);
});

app.patch(
  "/photo",
  auth.requireAuth,
  profile.handleUploadPhoto(upload),
  (req, res, next) => {
    profile.handleResizePhoto(req, res, next);
    profile.handlePatchPhoto(req, res, db);
  }
);

app.patch("/password", auth.requireAuth, (req, res) => {
  profile.handlePatchPassword(req, res, db, bcrypt);
});

// User Saved
app.post("/post-saved", auth.requireAuth, (req, res) => {
  saved.handlePostSaved(req, res, db);
});

app.post("/get-saved", auth.requireAuth, (req, res) => {
  saved.handleGetSaved(req, res, db);
});

app.post("/delete-saved", auth.requireAuth, (req, res) => {
  saved.handleDeleteSaved(req, res, db);
});

// User Liked
app.post("/post-liked", auth.requireAuth, (req, res) => {
  liked.handlePostLiked(req, res, db);
});

app.post("/get-liked", auth.requireAuth, (req, res) => {
  liked.handleGetLiked(req, res, db);
});

app.post("/delete-liked", auth.requireAuth, (req, res) => {
  liked.handleDeleteLiked(req, res, db);
});

// User Disliked
app.post("/post-disliked", auth.requireAuth, (req, res) => {
  disliked.handlePostDisliked(req, res, db);
});

app.post("/get-disliked", auth.requireAuth, (req, res) => {
  disliked.handleGetDisliked(req, res, db);
});

app.post("/delete-disliked", auth.requireAuth, (req, res) => {
  disliked.handleDeleteDisliked(req, res, db);
});

// User Hidden
app.post("/post-hidden", auth.requireAuth, (req, res) => {
  hidden.handlePostHidden(req, res, db);
});

app.post("/get-hidden", auth.requireAuth, (req, res) => {
  hidden.handleGetHidden(req, res, db);
});

app.post("/delete-hidden", auth.requireAuth, (req, res) => {
  hidden.handleDeleteHidden(req, res, db);
});

// User Searches
app.post("/post-searches", auth.requireAuth, (req, res) => {
  searches.handlePostSearches(req, res, db);
});

app.post("/get-searches", auth.requireAuth, (req, res) => {
  searches.handleGetSearches(req, res, db);
});

app.post("/delete-searches", auth.requireAuth, (req, res) => {
  searches.handleDeleteSearches(req, res, db);
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
