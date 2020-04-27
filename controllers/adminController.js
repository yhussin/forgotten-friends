const express = require('express');
const router = express.Router();

// Database
const db = require('../models');


router.get('/', (req, res) => {
    res.render('admin')
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
    }

    await db.Admin.create(adminData);
    res.redirect('/admin/login');
    } catch (err) {
        res.send(err)
        console.log('err', err)
    }
});

router.get('/login', (req, res) => {
    res.render('admin/login')
});

module.exports = router;