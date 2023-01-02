const router = require('express').Router()
const { Patient } = require("../models/patient")

router.post('/add-patient', async (req, res) => {
    console.log(req.body);
    try {
        await Patient.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            phone: req.body.phone,
        }).then(() => {
            res.status(201).send({
                status: true,
                message: "Record added successfully",
            }).save();
        }).catch((err) => {
            res.status(400).send({
                status: false,
                message: "Input field cannot be empty!",
            })
        });
    } catch (err) {
        res.send(err)
    }
});

router.get("/allpatients", (req, res) => {
    Patient.find()
        .then((patient) => res.json(patient))
        .catch((err) => res.status(400).json(`Error:${err}`));
});

router.get("/patient/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const patient = await Patient.findById(id)
        if (!patient) {
            return res.status(404).send()
        }
        return res.send(patient)
    } catch (error) {
        return res.status(500).send()
    }
});

router.put('/update-data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!patient) {
            return res.status(404).send()
        }
        return res.json('Patient data Updated!').save()
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id).exec()
        if (!patient) {
            return res.status(404).send()
        }
        return res.json('Patient record Deleted!')
    } catch (e) {
        return res.status(500).send({ 'e': "Unable to delete record!" })
    }
})

module.exports = router