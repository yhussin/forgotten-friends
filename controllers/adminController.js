const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin')
});

router.get('/register', (req, res) => {
    res.render('admin/register')
});

router.post('/register', async (req, res) => {
    console.log(req.body)
})

router.get('/login', (req, res) => {
    res.render('admin/login')
});

module.exports = router;