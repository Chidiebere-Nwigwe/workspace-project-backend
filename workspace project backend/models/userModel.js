const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:3
    },

    email: {
        type: String,
        required: true,
        min:8,
        max:250
    },

    password: {
        type: String,
        required: true,
        min:8
    }

})

module.exports = mongoose.model('userModel', userSchema);