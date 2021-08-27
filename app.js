// require express package
const express = require('express');

//require mongoose to connect out data base
const mongoose = require('mongoose');

//import the routes created
const authRoutes = require('./routes/authRoutes');

// store the required express in an app
const app = express();

// require cookie
const cookieParser = require('cookie-parser');


// set the ejs view engine
app.set('view engine', 'ejs');

//middlewares and static files

//serve images and css files
app.use(express.static('public'));

//takes json data with a request and parses it into a js object to be used in the code
app.use(express.json())

// middle ware for the cookie
app.use(cookieParser());
// CONNECT TO DATABASE

// store our mongo db link in a resuable constant
const dbURI = 'mongodb+srv://Mahfuz:Abumahfuz21@cluster0.taams.mongodb.net/smoothie-auth';
//call our URI with mongoose
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(7000))
.catch((err) => console.log(err));

// homepage route
app.get('/', (req, res) => {
    res.render('home', {title: 'Home'});
})

//smoothie route page
app.get('/smoothie', (req, res) => {
    res.render('smoothie', {title: 'Smoothie Drinks'});
})


// sign up and login routes
app.use(authRoutes);

// app.get('/Set-cookie', (req, res) => {
//     res.cookie('mahuser', true, {httpOnly: true});
//     res.cookie('damiuser', true, {maxAge: 3000 * 60, httpOnly: true});

//     res.send('cookie created')
// });
// app.get('/Read-cookie', (req, res) => {
//     const cookie = req.cookies
//     console.log(cookies)

//     res.json(cookies);
// });