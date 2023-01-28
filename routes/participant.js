const router = require('express').Router()
const { Participant } = require("../models/participant")

router.post('/add-participant', async (req, res) => {
    console.log(req.body)
    try {
        const newParticipant = await Participant.create({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            date_of_birth: req.body.date_of_birth,
            height: req.body.height,
            gender: req.body.gender,
        });
        newParticipant
            .save()
            .then(() => res.json('New Participant Created!'))
            .catch((err) => res.status(400).json(`Error:${err}`));
    } catch (err) {
        res.send(err)
    }
});

router.get("/allparticipants", (req, res) => {
    Participant.find()
        .then((participant) => res.json(participant))
        .catch((err) => res.status(400).json(`Error:${err}`));
});

router.get("/participant/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const participant = await Participant.findById(id)
        if (!participant) {
            return res.status(404).send()
        }
        return res.send(participant)
    } catch (error) {
        return res.status(500).send()
    }
});

router.put('/update-data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const participant = await Participant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!participant) {
            return res.status(404).send()
        }
        return res.json('Participant data Updated!').save()
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const participant = await Participant.findByIdAndDelete(id).exec()
        if (!participant) {
            return res.status(404).send()
        }
        return res.json('Participant record Deleted!')
    } catch (e) {
        return res.status(500).send({ 'e': "Unable to delete record!" })
    }
})

module.exports = router