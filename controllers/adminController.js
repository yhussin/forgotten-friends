const express = require('express');
const router = express.Router();

// Database
const db = require('../models');


router.get('/', (req, res) => {
    res.render('admin/index')
});

router.get('/register', (req, res) => {
    res.render('admin/register')
});

router.post('/register', async (req, res) => {
    console.log(req.body)

    try {
        const admin = await db.Admin.findOne({username: req.body.username});

        if (admin) {
            return res.send('<h1>Account already exists, try again</h1>')
        }
    
    const adminData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // HASH PASSWORD    
    }

    await db.Admin.create(adminData);
    res.redirect('/admin/login');
    } catch (err) {
        res.send(err)
    };
});

//GET new login
router.get('/login', (req, res) => {
    res.render('admin/login')
});

router.post('/login', async (req, res) => {
    try {
    console.log(req.body)
    const admin = await db.Admin.findOne({username: req.body.username});
    console.log('admin', admin);
    if (!admin) {
        return res.render('admin/login', {
            error: 'invalid credentials'
        });
    }
    // if (req.body.password !== '1234') {
    //     return res.render('admin/login', {
    //         error: 'invalid credentials'
    //     })
    // }
    req.session.currentUser = admin._id
    console.log('this is req.session', req.session)
    res.redirect('/')
    }
    catch (err) {
        res.send(err)
    }
});

module.exports = router;