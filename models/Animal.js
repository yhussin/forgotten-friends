const mongoose = require('mongoose');
const AnimalSchema = new mongoose.Schema({
    name: {type: String},
    image: {type: String},
    age: {type: Number}
})

const Animal = mongoose.model('Animal', AnimalSchema);
module.exports = Animal;