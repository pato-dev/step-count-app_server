const router = require('express').Router()
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: 'User with given email alredy exist' });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({ ...req.body, password: hashPassword }).save()
        return res.status(201).send({ message: "User created successfully!" })
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" })
    }
})
// router.get("/", (req, res) => {
//     User.find()
//         .then((user) => res.json(user))
//         .catch((err) => res.status(400).json(`Error:${err}`));
//     console.log('ok')
// });

router.get("/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    } catch (error) {
        return res.status(500).send()
    }
});

module.exports = router