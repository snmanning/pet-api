const express = require('express');
const router = express.Router(); //tiny lego brick
const Pet = require('../models/pet');

// get all pets
router.get('/pets', async (req, res) => {
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
router.get('/pets/:id', async (req, res) => {
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
router.post('/pets', async (req, res) => {
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
router.put('/pets/:id', async (req, res) => {
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
router.delete('/pets/:id', async (req, res) => {
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

module.exports = router;