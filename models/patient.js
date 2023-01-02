const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
    },
    userId: {
        type: ObjectId,
        ref: 'User',
    },

}, {
    timestamps: true
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = {
    Patient,
}
