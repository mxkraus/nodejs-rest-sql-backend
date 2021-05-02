require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const orgRoutes = require('./routes/org_feed');
const eventRoutes = require('./routes/event_feed');
const piRoutes = require('./routes/pi_feed');
const windhagerRoutes = require('./routes/windhager');
const authRoutes = require('./routes/auth');

/**
 * IMPORTANT: Header Middleware has to be set here
 * bevore all the requests get handled in the USE Middlewares! 
 * Otherwise the header doesnt get set.
 * Prevent error "has been blocked by CORS policy: 
 * No 'Access-Control-Allow-Origin' header is present on the requested resource."
 */
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE' );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(orgRoutes);
app.use(eventRoutes);
app.use(authRoutes);

app.use('/pi', piRoutes);
app.use('/wh', windhagerRoutes);

/**
 * Define entry view
 */
app.get('/', (req, res, next) => {
    res.sendFile( __dirname + "/index.html"); 
});

app.listen(3000);