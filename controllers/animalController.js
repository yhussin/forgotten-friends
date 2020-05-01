const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
    db.Animal.find((err, allAnimals) => {
        if (err) {
            return res.send(err)
        }
        res.render('animals/index', {
            animals: allAnimals,
        })
    });
});

router.get('/new', (req, res) => {

    console.log("Current user:", req.session.currentUser);
    if (!req.session.currentUser) {
        return res.redirect('/admin')
    }

    return res.render('animals/new');
});

router.post('/', async (req, res) => {
    try {
        req.body.admin = req.session.currentUser

        const newAnimal = await db.Animal.create(req.body);

        const adminProfile = await db.Admin.findById(req.session.currentUser);

        adminProfile.animals.push(newAnimal)

        adminProfile.save((err, savedAdminProfile) => {
            if (err) {
                return res.send(err)
            }
        })

        // console.log('currentUser from animalController:', req.session.currentUser);
        // console.log('newAnimal', newAnimal)
        // console.log('admin profile:', adminProfile.username)

        res.redirect(`/animals/${newAnimal._id}`)
    } catch (error) {
        res.render('animals/new', {
            error: 'PLEASE FILL OUT ALL FIELDS'
        })
    }
});


router.get('/:id', async (req, res) => {
    try {
        const foundAnimal = await db.Animal.findById(req.params.id).populate('admin');
        const adminProfile = await db.Animal.findById(req.params.id).populate('admin');

        res.render('animals/show', {
            animal: foundAnimal,
            admin: adminProfile,
        });
    } catch (err) {
        res.send(err);
    }
})



router.get('/:id/edit', (req, res) => {
    db.Animal.findById(req.params.id, (err, foundAnimal) => {
        if (err) {
            return res.send(err)
        }
        res.render('animals/edit', {
            animal: foundAnimal
        })
    })
});


router.put('/:id', async (req, res) => {
    
    try {   
    const updatedAnimal = await db.Animal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true})

        //console.log("session ID:", sessionId)
        //console.log("updated Animal:", updatedAnimal)

        res.redirect(`/animals/${updatedAnimal._id}`)

    } catch (err) {
        return res.send(err)}

});


router.delete('/:id', (req, res) => {
    db.Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
        if (err) {
            return res.send(err)
        }
        res.redirect('/animals')
    })
});

module.exports = router;