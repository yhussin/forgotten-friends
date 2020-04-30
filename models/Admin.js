const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, 
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    }],
})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin;