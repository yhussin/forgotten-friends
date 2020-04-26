const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

// CONTROLLERS 
const animalController = require('./controllers/animalController');


app.set('view engine', 'ejs')

//-----------ROUTES

// HOMEPAGE
app.get('/', (req, res) => {
   res.render('index')
});

// ADMIN 
app.get('/admin', (req, res) => {
   res.render('admin')
});

// ALL ANIMALS
// app.get('/animals', (req, res) => {
//    res.render('show')
//    });

 app.use('/animals', animalController);  
//-----------LISTENER

app.listen(port, () => console.log(`Server is running on port: ${port}`));