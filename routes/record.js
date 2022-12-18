const router = require('express').Router()
const { Record } = require("../models/record")

router.get("/", (req, res) => {
    Record.find()
        .then((record) => res.json(record))
        .catch((err) => res.status(400).json(`Error:${err}`));
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    try {
        await Record.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            score: req.body.score,
            HbA1c: req.body.HbA1c,
            meanBlood: req.body.meanBlood,
            glucose: req.body.glucose,
        }).then(() => {
            res.status(201).send({
                status: true,
                message: "Record added successfully",
            }).save();
        }).catch((err) => {
            res.status(400).send({
                status: false,
                message: "Name or Score cannot be empty!",
            })
        });
    } catch (err) {
        res.send(err)
    }
});

router.get("/record/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const record = await Record.findById(_id)
        if (!record) {
            return res.status(404).send()
        }
        return res.send(record)
    } catch (error) {
        return res.status(500).send()
    }
});

router.put('/update/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const record = await Record.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!record) {
            return res.status(404).send()
        }
        return res.json('Record Updated!').save()
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const record = await Record.findByIdAndDelete(id).exec()
        if (!record) {
            return res.status(404).send()
        }
        return res.json('User record Deleted!')
    } catch (e) {
        return res.status(500).send({ 'e': "Unable to delete record!" })
    }
})

module.exports = router