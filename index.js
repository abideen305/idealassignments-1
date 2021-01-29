const express = require("express");
const passport = require("./src/passport/index");
const app = express();
// const helmet = require("helmet-");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const routes = require("./src/routes/");
require("dotenv").config();

// import database connection
let dbConnection = require("./src/db/mongoose");

// tell express to use helmet
// app.use(helmet());

// set up view engines
app.set("view engine", "ejs");

app.use(express.static("public"));

// allow your app to parse urlencoded and json encoded request data
// const bodyParser = require("body-parser");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//set up session
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "some-secret", // migrate this secret and set it in your config or enviromental variables sometime in the future
    cookie: {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
    store: new MongoStore({
      ttl: 1 * 24 * 60 * 60, // set session to expire in 24hours if requests are not made to the server
      touchAfter: 60 * 60, //update every one hour
      mongooseConnection: dbConnection.connection, // tell your store to use your db defined in your database file to store your session;
    }),
  })
);

// initialize passport
app.use(passport.initialize());

// inform passport of the session and tell the app to allow passport manage your sessions;
app.use(passport.session());

//use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// setup your routes

//middleware to pass user obj to the req.locals in the ejs instance.
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Routing
app.use(routes);

//setup your fallback route here
app.get("*", (req, res) => {
  // add a 404 page to handle your 404 errors;
  res.render("error_404");
});

// start your server
const port = process.env.PORT || "4000";

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
