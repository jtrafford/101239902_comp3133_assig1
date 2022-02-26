const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        trim: true
    },

    firstname: {
        type: String,
        required: true,
        trim: true    
    },

    lastname: {
        type: String,
        required: true,
        trim: true    },

    password: {
        type: String, 
        required: true,
        minLength: 6,
        validate: function(value) {
            regex = /^[A-Za-z0-9#$&_]+$/
            return regex.test(value);
        }
    },

    email: {
        type: String,
        required: true,
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },

    type: {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        trim: true
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;