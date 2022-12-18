require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require('./db/mongoose');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const recordRoute = require('./routes/record');

// Database connection
connection()

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/records', recordRoute)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
