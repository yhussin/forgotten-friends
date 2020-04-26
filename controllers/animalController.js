const express = require('express');

const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
    db.Animal.find((err, allAnimals) => {
        if(err) {
            return res.send(err)
        }
        res.render('animals/index', {
            animals: allAnimals,
        })
    })
});

router.get('/new', (req, res) => {
    res.render('animals/new')
});

router.post('/', (req, res) => {
    db.Animal.create(req.body, (err, newAnimal) => {
        if(err) {
            return res.send(err)
        }
        res.redirect('/animals')
    })
});

router.get('/:id', (req, res) => {
    db.Animal.findById(req.params.id, (err, foundAnimal) => {
        if(err) {
            return res.send(err)
        }
        res.render('animals/show', {
            animal: foundAnimal
        })
    })
});

router.delete('/:id', (req, res) => {
    db.Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
        if(err) {
            return res.send(err)
        }
        res.redirect('/animals')
    })
});

module.exports = router;