const router = require('express').Router()
const { Clinicals } = require("../models/clinical")

// router.post('/add-clinical', async (req, res) => {
//     try {
//         const newClinical = await new Clinicals({
//             name: req.body.name,
//             visit_date: req.body.visit_date,
//             a1c: req.body.a1c,
//             systolic_blood_pressure: req.body.systolic_blood_pressure,
//             height: req.body.height,
//             weight: req.body.weight,
//             bmi: req.body.bmi,
//             prescription: req.body.prescription
//         });
//         newClinical
//             .save()
//             .then(() => res.json('New Clinical_data Created!'))
//             .catch((err) => res.status(400).json(`Error:${err}`));
//     } catch (err) {
//         res.send(err)
//     }
// });

// googlefit App---------
router.post('/add-clinical', async (req, res) => {
    // const { error } = validate();
    // console.log(error)
    try {
        // if (error)
        //     return res.status(400).send({ message: error.details[0].message });

        const Clinical_data = await Clinicals.findOne({ name: req.body.name });
        if (Clinical_data)
            return res.status(409).send({ message: 'Clinical_data with given email already exist' });

        const newClinicals = await new Clinicals({
            name: req.body.name,
            visit_date: req.body.visit_date,
            a1c: req.body.a1c,
            systolic_blood_pressure: req.body.systolic_blood_pressure,
            height: req.body.height,
            weight: req.body.weight,
            bmi: req.body.bmi,
            prescription: req.body.prescription
        })
        newClinicals.save()

        return res.status(201).send({ message: "Clinical_data created successfully!" })
            .catch((err) => {
                res.status(400).send({
                    status: false,
                    message: "Input field cannot be empty!",
                })
            });
    } catch (err) {
        res.send(err)
    }
});

router.get("/all-test-result", (req, res) => {
    Clinicals.find()
        .then((clinical_data) => res.json(clinical_data))
        .catch((err) => res.status(400).json(`Error:${err}`));
});

router.get("/clinical_data/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const clinical_data = await Clinicals.findById(_id)
        if (!clinical_data) {
            return res.status(404).send()
        }
        return res.send(clinical_data)
    } catch (error) {
        return res.status(500).send()
    }
});

router.put('/update-result/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const clinical_data = await Clinicals.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!clinical_data) {
            return res.status(404).send()
        }
        return res.json('Clinical_data Updated!').save()
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const clinical_data = await Clinicals.findByIdAndDelete(id).exec()
        if (!clinical_data) {
            return res.status(404).send()
        }
        return res.json('User clinical_data Deleted!')
    } catch (e) {
        return res.status(500).send({ 'e': "Unable to delete clinical_data!" })
    }
})

module.exports = router