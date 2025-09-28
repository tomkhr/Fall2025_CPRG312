const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/auth');
require('dotenv').config();
const cors = require('cors');   // cross origin resource sharing.

console.log(`Port: ${process.env.PORT}`);   // verify if the env file is read properly.

const app = express();

const frontendUrl = "http://localhost:5173";

app.use(cors({
    origin: frontendUrl,
}));

app.use(express.json());     // The data should come in json format in body

app.use('/api/auth', router);   // adding user register, login route to express app

app.get('/', (req, res) => {
    res.send("Welcome to Password Hashing Demo, Goto Register page to create new user");
});

async function connectToDB() {
    try {

        await mongoose.connect(process.env.DB_URL+'/'+process.env.DB_NAME);
        console.log(`Connected to DB`);

    } catch(error) {
        console.error(`error while connecting to DB ${error}`);
    }
}

http.createServer(app).listen(process.env.PORT, () => {
    connectToDB();
    console.log(`Http server is running at port ${process.env.PORT}`);
})

