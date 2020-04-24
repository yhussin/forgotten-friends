const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

app.set('view engine', 'ejs')

//-----------ROUTES

app.get('/', (req, res) => {
   res.render('index')
});



//-----------LISTENER

app.listen(port, () => console.log(`Server is running on port: ${port}`));