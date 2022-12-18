const mongoose = require('mongoose');

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
    score: {
        type: Number,
        trim: true,
        required: true
    },
    HbA1c: {
        type: Number,
        trim: true,
    },
    meanBlood: {
        type: Number,
        trim: true,
    },
    glucose: {
        type: Number,
        trim: true,
    },
}, {
    timestamps: true
});

const Record = mongoose.model('records', recordSchema);

module.exports = {
    Record,
}
