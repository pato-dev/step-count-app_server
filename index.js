// const express = require('express')
// const app = express()
// const cors = require('cors')

// const Participants = [
//     {
//         id: 1,
//         name: "Uche Carine",
//         email: "uche@gmail.com",
//         phone_number: "+234(0)704 992 8888",
//         date_of_birth: "1990-01-21",
//         height: 233,
//         gender: "female"
//     },
//     {
//         id: 2,
//         name: "Femi Code",
//         email: "femi@gmail.com",
//         phone_number: "+234(0)704 442 4455",
//         date_of_birth: "2000-12-15",
//         height: 230,
//         gender: "male"
//     },
// ]

// app.use(cors())

// app.get("/", (req, res) => {
//     const { q } = req.query;
//     keys = ['name', 'email']
//     const search = (data) => {
//         return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)))
//     };
//     q ? res.json(search(Participants).slice(0, 10)) : res.json(Participants.slice(0, 10));
// })

// app.listen(5000, () => console.log('API is working!'))


// ----Main code start-----------
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require('./db/mongoose');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const ClinicalDataRoute = require('./routes/clinicalData');
const participantRoute = require('./routes/participant');

// Database connection
connection()

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/clinicals', ClinicalDataRoute)
app.use('/api/participants', participantRoute)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
