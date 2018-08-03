const express = require('express');
const dotenv = require('dotenv');
const server = express();
const mongoose = require('mongoose');

// set up environment variables
dotenv.config();

// connect to the database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true });

// set up the port
const port = process.env.PORT || 8008;

// power ups (middleware)

// models
const Pet = mongoose.model('Pet', { name : String, owner: String });

// routes
// get all pets
server.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({
            "pets": pets
        })
    } catch(err) {
        res.status(500).jason({
            msg: "stuff done broke"
        });
    }
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