const mongoose = require('mongoose');
const joi = require('joi');
const { ObjectId } = mongoose.Schema;
const clinical_DataSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    visit_date: {
        type: Date,
        trim: true,
        required: true,
    },
    a1c: {
        type: String,
        trim: true,
        required: true
    },
    systolic_blood_pressure: {
        type: Number,
        trim: true,
    },
    height: {
        type: Number,
        trim: true,
    },
    weight: {
        type: Number,
        trim: true,
    },
    bmi: {
        type: Number,
        trim: true,
    },
    prescription: {
        type: String,
        trim: true
    },
    deidentified_participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Participant'
    },
}, {
    timestamps: true
});

const Clinicals = mongoose.model('clinical_data', clinical_DataSchema);

const validate = (data) => {
    const schema = joi.object({
        visit_date: joi.string().required().label('Visit date'),
        a1c: joi.string().required().label('HA1c'),
        systolic_blood_pressure: joi.string().required().label('systolic_blood_pressure'),
        weight: joi.string().required().label('Weight'),
        prescription: joi.string().required().label('Prescription'),
    })
    return schema.validate(data)
}

module.exports = {
    Clinicals,
    validate
}
