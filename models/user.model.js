const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    // db modelling
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dob: {
        type: Date
    },
    address: { // object
        tempAddress: [String], // array of string
        permanentAddress: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'disabled'],
        default: 'active'
    },
    contactInformation: {
        phoneNumber: {
            type: Number,
            minlenth: 10,
            maxlength: 10
        },
        email: {
            type: String,
            sparse: true,
            // unique: true
        }
    },
    role: {
        type: Number, // mongoo1 for admin, 2 for general user, 3 for....
        default: 2
    },
    isMarried: Boolean,
    image: String,
    updated_by: String
}, {
    timestamps: true
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel;
