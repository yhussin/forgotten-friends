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

    res.render('animals/new', {
       //error: "Please complete all fields",
       //need to update - shows up even without error
    });
});

router.post('/', async (req, res) => {
    //connection to req.session.currentuser
    try {
        req.body.admin = req.session.currentUser

        const newAnimal = await db.Animal.create(req.body);

        const adminProfile = await db.Admin.findById(req.session.currentUser);

        adminProfile.animals.push(newAnimal)

        adminProfile.save((err, savedAdminProfile) => {
        if (err) {
            return res.send(err)
        } 
        //res.redirect(`/animals/${newAnimal._id}`)
        })

        // console.log('currentUser from animalController:', req.session.currentUser);
        // console.log('newAnimal', newAnimal)
        // console.log('admin profile:', adminProfile.username)

        res.redirect(`/animals/${newAnimal._id}`)
    }   catch (err) {
        res.send(err)
    }
});


router.get('/:id', async (req, res) => {
    try {
        const foundAnimal = await db.Animal.findById(req.params.id).populate('admin');
        const adminProfile = await db.Animal.findById(req.params.id).populate('admin');
       
        console.log("foundAnimal", foundAnimal);
        console.log("adminprofile:", adminProfile);
       

        res.render('animals/show', {
            error: "Some error message", 
            animal: foundAnimal, 
            admin: adminProfile,
        });
    } catch (err) {
        res.send(err);
    }
})




// router.get('/:id', (req, res) => {  //use populate
//     db.Animal.findById(req.params.id, (err, foundAnimal) => {
//         if (err) {
//             return res.send(err)
//         }
//         console.log('foundAnimal:', foundAnimal)
//         res.render('animals/show', {
//             animal: foundAnimal,
            
//             //user: adminProfile.username,
//         })
//     })
// });

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