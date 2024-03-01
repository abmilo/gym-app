const express = require('express');
const app = express();
const mongoose = require("mongoose");

require('dotenv').config();
const port = process.env.PORT || 3001;


const dbURL =
    process.env.MONGO_URL;

mongoose
    .connect(dbURL, {
        dbName: 'proj1',
    })
    .then(() => console.log("DB Connected!"));


app.use('/user', require('./routes/users'));


app.get('/', function (req, res) {
    res.send('home, unprotected');
});


app.get('/auth', function (req, res) {
    res.send('Secured Resource');
});


app.listen(port, () => {
    console.log(`backend is running on port: ${port}`);
})