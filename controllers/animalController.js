const express = require('express');

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

    res.render('animals/new');
});

router.post('/', async (req, res) => {
    //connection to req.session.currentuser

    try {
        const newAnimal = await db.Animal.create(req.body)

        const adminProfile = await db.Admin.findById(req.session.currentUser)

        adminProfile.animals.push(newAnimal)

        const connectedAdmin = await adminProfile.save()

        console.log('currentUser from animalController:', req.session.currentUser);
        console.log('newAnimal', newAnimal)
        console.log('admin profile:', adminProfile.username)

        res.redirect(`/animals/${newAnimal._id}`)
    }   catch (err) {
        res.send(err)
    }
});

// router.post('/', (req, res) => {
//     //connection to req.session.currentuser
//     db.Animal.create(req.body, (err, newAnimal) => {
//         if(err) {
//             return res.send(err)
//         }
//         res.redirect('/animals')
//     })
// });

router.get('/:id', (req, res) => {
    db.Animal.findById(req.params.id, (err, foundAnimal) => {
        if (err) {
            return res.send(err)
        }
        //console.log('username:', req.body.username)
        res.render('animals/show', {
            animal: foundAnimal,
        })
    })
});

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

router.put('/:id', (req, res) => {
    db.Animal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedAnimal) => {
            if (err) {
                return res.send(err)
            }
            res.redirect(`/animals/${updatedAnimal._id}`)
        }
    )
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