const express = require("express"),
    ejs = require("ejs"),
    mongoose = require("mongoose"),
    multer = require("multer"),
    session = require('express-session'),
    bcrypt = require("bcryptjs"),
    fs = require("fs"),
    nodemailer = require('nodemailer'),
    flash = require('connect-flash'),
    path = require("path"),
    app = express();

// Setting up the view engine and static files
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/studifyAPP", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Session middleware
app.use(session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true
}));

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


// Route for homepage
app.get('/', (req, res) => {
    res.render('index', { studyGroups }); // Pass studyGroups to the EJS template
});

// Route for getting to group listed
app.get("/listed", (req, res) => {
    res.render("listed");
});


// About page
app.get("/about", (req, res) => {
    res.render("about");
});

// Tutor registration page
app.get("/tutor-registration", (req, res) => {
    res.render("tutor-registration");
});


// Student registration page
app.get("/student-registration", (req, res) => {
    res.render("student-registration");
});


// Start the server
app.listen(2500, () => console.log("Server started on port 2500"));
