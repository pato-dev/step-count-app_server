const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { string } = require('joi');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });
    return token
}
const User = mongoose.model('users', userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().required().label('Email'),
        phone: joi.string().required().label('Phone'),
        password: passwordComplexity().required().label('Password'),
        gender: joi.string().required().label('Select Gender'),
        role: joi.number().required().label('Assign role'),
    })
    return schema.validate(data)
}

module.exports = {
    User,
    validate
}