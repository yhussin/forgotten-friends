const mongoose = require('mongoose');
const AnimalSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    age: {
        type: Number, 
        required: true,
    }
});

const Animal = mongoose.model('Animal', AnimalSchema);
module.exports = Animal;



