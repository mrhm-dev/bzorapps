const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const passport = require('passport');
const mongoose = require('mongoose');

// Import all personal modules
const news = require('./api/routes/news');
const users = require('./api/routes/users');

const config = require('./api/config/config');

// Create instance of express
const app = express();

// Database Connection
mongoose.connect(config.database.db);
mongoose.Promise = global.Promise;

// Check for Database Connection
mongoose.connection.on('connected', () =>{
   console.log('Database is Connected...') ;
});

// Check for Database Error
mongoose.connection.on('error', (err) => {
    console.log('Database Connection Failed');
});

// Using morgan for Logger
app.use(morgan('dev'));

// Using public as a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Using cors for RESTFUL API
app.use(cors());

// Using Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling Routes
app.get('/', (req, res) => {
    res.status(200).json({
        response: {
            status: 200,
            message: "OK"
        }
    }); 
});

// Applyling news routes
app.use('/api/news', news);
app.use('/api/users', users);

// Handling Errors
app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;

