const express = require('express');
const dotenv = require('dotenv');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/404')

// set up environment variables
dotenv.config();

// connect to the database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true });

// set up the port
const port = process.env.PORT || 8008;

//routers
const petRouter = require('./router/pets');

// power ups (middleware)
server.use(helmet());
server.use(morgan('combined'));
server.use(bodyParser.json()); //accept json data
server.use(bodyParser.urlencoded({ extended: true })); //accept html form data

//routes
server.use(petRouter);

//404 handler
server.use(notFoundHandler);

//error handler
server.use(errorHandler);

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});