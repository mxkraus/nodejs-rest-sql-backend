require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

/**
 * App Start
 * 
 */

const app = express();

const eventRoutes = require('./routes/event_feed');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(eventRoutes);

app.use('/', (req, res, next) => {
    res.send('<h1>App Start!<h1>');
})

app.listen(3000);