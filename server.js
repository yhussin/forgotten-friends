const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 4000;

// CONTROLLERS 
const animalController = require('./controllers/animalController');
// const adminController = require('./controllers/adminController');


app.set('view engine', 'ejs')

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//-----------ROUTES

// HOMEPAGE
app.get('/', (req, res) => {
   res.render('index')
});

// ROOT ROUTES
app.use('/animals', animalController); 
// app.use('/admin', adminController);

//-----------LISTENER
app.listen(port, () => console.log(`Server is running on port: ${port}`));