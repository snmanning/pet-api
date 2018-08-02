const express = require('express');
const server = express();

// set up the port
const port = process.env.PORT || 8008;

// power ups (middleware)


// routes


// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});