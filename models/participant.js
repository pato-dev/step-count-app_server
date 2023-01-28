const mongoose = require('mongoose');
// const joi = require('joi');

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
        trim: true,
        max: 15,
        required: true
    },
    date_of_birth: {
        type: Date,
        trim: true,
    },
    height: {
        type: Number,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    deidentified_participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Clinicals'
    },

}, {
    timestamps: true
});

const Participant = mongoose.model('named_participant', participantSchema);

// const validate = (data) => {
//     const schema = joi.object({
//         name: joi.string().required().label('Name'),
//         email: joi.string().email().required().label('Email'),
//         phone_number: joi.string().required().label('Phone number'),
//         date_of_birth: joi.string().required().label('Date of Birth'),
//         height: joi.string().required().label('Height'),
//         gender: joi.string().required().label('Gender'),
//     })
//     return schema.validate(data)
// }

module.exports = {
    Participant,
}