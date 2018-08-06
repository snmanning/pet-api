const express = require('express');
const dotenv = require('dotenv');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

// set up environment variables
dotenv.config();

// connect to the database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true });

// set up the port
const port = process.env.PORT || 8008;

// power ups (middleware)
server.use(helmet());
server.use(morgan('combined'));
server.use(bodyParser.json()); //accept json data
server.use(bodyParser.urlencoded({ extended: true })); //accept html form data

// models
const Pet = require('./models/pet');

// routes
// get all pets
server.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({
            "pets": pets
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            msg: "stuff done broke"
        });
    }
});
// get one special pet by id
server.get('/pets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pets = await Pet.find({ _id: id });
        res.status(200).json({
            pets: pets
        })
    } catch (err) {
        res.status(500).json({
            msg: 'Stuff still broke'
        });
    }
});
// create a new pet
server.post('/pets', async (req, res) => {
    const { name, owner, petType, age, createdAt } = req.body;
    try {
        const pet = new Pet({ name, owner, petType, age, createdAt });
        await pet.save();
        res.status(201).json({
            msg: 'saved pet',
            pet
        })
    } catch(err) {
        res.status(500).json({
            msg: 'pet not created'
        });
    }
});
// update one special pet by id
server.put('/pets/:id', async (req, res) => {
    const { id } = req.params;
    const { name, owner } = req.body;
    try {
        const updatedPet = await Pet.findByIdAndUpdate(id, { name, owner }, {new: true});
        res.status(200).json({
            msg: 'updated successful',
            pet: updatedPet
        })
    } catch (error) {
        res.status(500).json({
            msg: 'update no happen'
        });
    }
});
// delete one special pet
server.delete('/pets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Pet.findByIdAndRemove(id);
        res.status(200).json({
            msg: "yaaaayyyy!! destruction"
        });
    } catch (err) {
        res.status(500).json({
            msg: "broked"
        });
    }
});


// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});