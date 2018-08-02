const express = require('express');
const server = express();

// set up the port
const port = process.env.PORT || 8008;

// power ups (middleware)


// routes
// get all pets
server.get('/pets', (req, res) => {
    res.send('getting all pets');
});
// get one special pet by id
server.get('/pets/:id', (req, res) => {
    res.send(`get ${req.params.id} pet`);
});
// create a new pet
server.post('/pets', (req, res) => {
    res.send('creating a new pet');
});
// update one special pet by id
server.put('/pets/:id', (req, res) => {
    res.send(`updating ${req.params.id} pet`);
});
// delete one special pet
server.delete('/pets/:id', (req, res) => {
    res.send(`deleting ${req.params.id} pet`);
});


// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});