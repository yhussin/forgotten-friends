const express = require('express');
const bcrypt = require('bcryptjs');
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

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    
    const adminData = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
        // HASH PASSWORD - it is still showing on new registrations
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
            error: 'INVALID CREDENTIALS'
        });
    }

    const passwordsMatch = bcrypt.compareSync(req.body.password, admin.password)

    if (passwordsMatch === false) {
        return res.render('admin/login', {
            error: 'INVALID CREDENTIALS'
        })
    }
    req.session.currentUser = admin._id
    console.log('this is req.session:', req.session)
    res.redirect('/')
    }
    catch (err) {
        res.send(err)
    }
});

router.get('/logout', async (req, res) => {
    try {
        if (req.session.currentUser !== 'undefined') {
        await req.session.destroy();
        res.redirect('/admin/login');
        console.log("is session deleted?:", req.session)    
        }
        
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;


//            <h3>Profile created on: <%= new Date (animal.createdAt).toLocaleDateString() %></h3>
// add to show route