const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const recordSchema = new mongoose.Schema({
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
    HbA1c: {
        type: Number,
        trim: true,
    },
    glucose: {
        type: Number,
        trim: true,
    },
    patientId: {
        type: ObjectId,
        ref: 'Patient._id',
    },
}, {
    timestamps: true
});

const Record = mongoose.model('records', recordSchema);

module.exports = {
    Record,
}
