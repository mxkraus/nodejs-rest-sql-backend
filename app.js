require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

/**
 * App Start
 * 
 */

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



const eventRoutes = require('./routes/event_feed');
const authRoutes = require('./routes/auth');

app.use(eventRoutes);
app.use(authRoutes);

app.use('/', (req, res, next) => {
    res.send('<h1>App Start!<h1>');
})

app.listen(3000);