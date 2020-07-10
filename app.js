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

const orgRoutes = require('./routes/org_feed');
const eventRoutes = require('./routes/event_feed');
const authRoutes = require('./routes/auth');

/**
 * Prevent error "has been blocked by CORS policy: 
 * No 'Access-Control-Allow-Origin' header is present on the requested resource."
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(orgRoutes);
app.use(eventRoutes);
app.use(authRoutes);

app.use('/', (req, res, next) => {
    res.send('<h1>App Start!<h1>');
})

app.listen(3000);